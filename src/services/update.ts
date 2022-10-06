import { Response } from "express";
import prisma from "../prisma/client";
import { reqwithUser } from "../modules/auth";
export const getUpdates = async (req: reqwithUser, res: Response) => {
  const userid = req.user?.id;
  const updates = await prisma.product.findMany({
    where: {
      user: { id: userid },
    },
    select: {
      updates: true,
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
  const product = await prisma.product.findUnique({
    where: {
      id: req.body.id,
      belongsto_id: req.user?.id,
    },
  });
  if (!product) {
    return res.status(400).json({ message: "nope" });
  } else {
    const update = await prisma.update.create({
      data: req.body,
    });
  }
  return res.status(201).json({ data: product });
};

export const updateUpdate = async (req: reqwithUser, res: Response) => {
  const product = await prisma.product.findFirst({
    where: {
      belongsto_id: req.user?.id,
    },
    include: {
      updates: {
        where: { product: { user: { id: req.user?.id } }, id: req.params.id },
      },
    },
  });
  if (product?.updates?.length == 0 || !product) {
    return res
      .status(404)
      .json({ error: `cannot find an update with id${req.params.id}` });
  }
  const update = await prisma.update.update({
    where: {
      id: req.params.id,
    },
    data: req.body,
  });

  return res.status(200).json({ update });
};

export const deleteUpdate = async (req: reqwithUser, res: Response) => {
  const product = await prisma.product.findFirst({
    where: {
      belongsto_id: req.user?.id,
    },
    include: {
      updates: {
        where: { product: { user: { id: req.user?.id } }, id: req.params.id },
      },
    },
  });
  if (product?.updates?.length == 0 || !product) {
    return res
      .status(404)
      .json({ error: `cannot find an update with id: ${req.params.id}` });
  }
  const deleted = await prisma.update.delete({
    where: {
      id: req.params.id,
    },
  });
  return res.status(200).json({ update: deleted.id });
};
