import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator/src/validation-result";
export const validateUserInput = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const err = validationResult(req);
  err.array();
  if (!err.isEmpty()) {
    return res.status(400).json({ error: err.array() });
  } else {
    next();
  }
};
