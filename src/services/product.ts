import { Response } from "express";
import prisma from "../prisma/client";
import { reqwithUser } from "../modules/auth";
export const getProducts = async (req: reqwithUser, res: Response) => {
  const userid = req.user?.id;
  const products = await prisma.product.findMany({
    where: {
      user: { id: userid },
    },
  });
  return res.status(200).json({ data: products });
};

export const getProduct = async (req: reqwithUser, res: Response) => {
  const productId = req.params.id;
  const userid = req.user?.id;
  const products = await prisma.product.findFirst({
    where: {
      user: { id: userid },
      AND: {
        id: productId,
      },
    },
  });
  return res.status(200).json({ data: products });
};

export const createProduct = async (req: reqwithUser, res: Response) => {
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

export const updateProduct = async (req: reqwithUser, res: Response) => {
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

export const deleteProduct = async (req: reqwithUser, res: Response) => {
  const deleted = await prisma.product.delete({
    where: {
      id: req.params.id,
      belongsto_id: req.user?.id,
    },
  });
};
