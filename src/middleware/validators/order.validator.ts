import type { RequestHandler } from "express";
import AppError from "../../utils/appError";
import { updateOrderStatusSchema } from "../../schemas/order.schema";

export const updateStatusValidator: RequestHandler = (req, res, next) => {
  const result = updateOrderStatusSchema.safeParse(req.body);
  if (!result.success) {
    return next(new AppError("invalid body", 400));
  }
  req.body = result.data;
  next();
};
