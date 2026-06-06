import type { RequestHandler } from "express";
import AppError from "../../utils/appError";
import {
  createProductSchema,
  updateProductSchema,
  productsQuerySchema,
} from "../../schemas/product.schema";
import { getZodErrorMessage } from "../../utils/zod";

export const getAllProductsValidator: RequestHandler = (req, res, next) => {
  const result = productsQuerySchema.safeParse(req.query);
  if (!result.success) {
    const message = getZodErrorMessage(result.error);
    return next(new AppError(message ?? "Invalid query", 400));
  }
  req.validatedProductQuery = result.data;
  next();
};

export const createProductValidator: RequestHandler = (req, res, next) => {
  const result = createProductSchema.safeParse(req.body);
  if (!result.success) {
    const message = getZodErrorMessage(result.error);
    return next(new AppError(message ?? "Invalid body", 400));
  }
  req.body = result.data;
  next();
};

export const updateProductValidator: RequestHandler = (req, res, next) => {
  const result = updateProductSchema.safeParse(req.query);
  if (!result.success) {
    const message = getZodErrorMessage(result.error);
    return next(new AppError(message ?? "Invalid query", 400));
  }
  req.body = result.data;
  next();
};
