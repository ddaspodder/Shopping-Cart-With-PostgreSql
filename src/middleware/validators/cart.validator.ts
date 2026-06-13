import { RequestHandler } from "express";
import { updateCartSchema } from "../../schemas/cart.schema";
import AppError from "../../utils/appError";

export const updateCartValidator: RequestHandler = (req, res, next) => {
  const result = updateCartSchema.safeParse(req.body);
  if (!result.success) {
    return next(new AppError("invalid body", 400));
  }
  req.body = result.data;
  next();
};
