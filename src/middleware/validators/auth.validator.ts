import type { RequestHandler } from "express";
import { createUserSchema } from "../../schemas/user.schema";
import { getZodErrorMessage } from "../../utils/zod";
import AppError from "../../utils/appError";

export const authValidator: RequestHandler = (req, res, next) => {
  const result = createUserSchema.safeParse(req.body);
  if (!result.success) {
    const message = getZodErrorMessage(result.error);
    return next(new AppError(message ?? "Invalid body", 400));
  }
  req.body = result.data;
  next();
};
