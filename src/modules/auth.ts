import { User } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { IncomingMessage } from "http";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcrypt";

/**
 * create  a token
 */
export const createJwt = (user: User | null) => {
  if (user) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWTSECRET!,
      {
        expiresIn: "1h",
      }
    );
    return token;
  } else {
    return;
  }
};

/**
 * checkpassword
 */
export const checkpassword = (password: string, hash: string) => {
  return bcrypt.compare(password, hash);
};

/**
 * hash the password
 */
export const hash = (password: string) => {
  return bcrypt.hash(password, 4);
};

/**
 * verifhy
 */
const checktoken = (token: string): JwtPayload | any => {
  try {
    const jwtpayload = jwt.verify(token, process.env.JWTSECRET!);
    //check the db for this user
    return jwtpayload;
  } catch (error) {
    console.error(error);
    return { error };
  }
};
export type reqwithUser = IncomingMessage & {
  user?: { id: string; username: string };
};

/**
 * auth middleware`
 */
export const protect = (
  req: reqwithUser,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "No Auth" });
  }
  const jwtpayload = checktoken(token);
  if (jwtpayload.error) {
    return res.status(401).json({ message: "No Auth, not a valid token" });
  }
  req.user = jwtpayload;
  next();
};
