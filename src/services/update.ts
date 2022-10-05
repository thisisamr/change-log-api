import { Response } from "express";
import prisma from "../../prisma/client";
import { reqwithUser } from "../modules/auth";
export const getUpdates = async (req: reqwithUser, res: Response) => {
  const userid = req.user?.id;
  const updates = await prisma.product.findMany({
    where: {
      user: { id: userid },
    },
    select: {
      Update: true,
    },
  });
  return res.status(200).json({ data: updates });
};

export const getUpdate = async (req: reqwithUser, res: Response) => {
  const updateId = req.params.id;
  const userid = req.user?.id;
  const update = await prisma.product.findUnique({
    where: {
      id: updateId,
      belongsto_id: userid,
    },
  });
  return res.status(200).json({ data: update });
};

export const createUpdate = async (req: reqwithUser, res: Response) => {
  const name = req.body.name;
  const userId = req.user?.id;
  const product = await prisma.product.create({
    data: {
      name: name,
      user: { connect: { id: userId } },
    },
  });
  return res.status(201).json({ data: product });
};

export const updateUpdate = async (req: reqwithUser, res: Response) => {
  const updated = await prisma.product.update({
    where: {
      id: req.params.id,
    },
    data: {
      name: req.body.name,
    },
  });
  return res.status(200).json({ updated });
};

export const deleteUpdate = async (req: reqwithUser, res: Response) => {
  const deleted = await prisma.product.delete({
    where: {
      id: req.params.id,
      belongsto_id: req.user?.id,
    },
  });
};
