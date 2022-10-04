import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { Prisma } from "@prisma/client";
import { hash } from "bcrypt";
import { checkpassword, createJwt } from "../modules/auth";
/**
 * creating a user
 */
export const createNewUser = async (req: Request, res: Response) => {
  const newuser: Prisma.UserCreateInput = req.body.user;
  try {
    newuser.password = await hash(newuser.password, 5);
    const user = await prisma.user.create({
      data: newuser,
    });
    const token = createJwt(user);
    return res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};
/**
 * signin
 */

export const signin = async (req: Request, res: Response) => {
  if (!req.body?.email || !req.body?.password) {
    return res.status(400).json({ message: "invalid input" });
  }
  try {
    const found = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    console.log(found);
    const isValid = await checkpassword(
      req.body.password,
      found?.password || ""
    );

    if (!isValid) {
      return res.status(401).json({ message: `email or password not correct` });
    }
    const token = createJwt(found);
    return res.status(200).json({ token });
  } catch (error) {
    res.status(400).json(error);
  }
};
