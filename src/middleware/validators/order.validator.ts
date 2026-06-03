import type { RequestHandler } from "express";
import AppError from "../../utils/appError";

import { statuses } from "@prisma/client";

export const updateStatusValidator: RequestHandler = (req, res, next) => {
  const { status } = req.body;
  const validStatus = Object.values(statuses);
  if (!status || !validStatus.includes(status))
    return next(new AppError("invalid status", 400));
  next();
};
