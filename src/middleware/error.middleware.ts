import type { ErrorRequestHandler } from "express";
import AppError from "../utils/appError";
import { failure } from "../utils/responseHandler";
import { getPostgresErrorResponse } from "../utils/postgreErrorMap";

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.error((err as Error).stack);

  if (err instanceof AppError) {
    return failure(res, err.message, err.statusCode);
  }

  const pgResp = getPostgresErrorResponse(err);
  if (pgResp) {
    return failure(res, pgResp.message, pgResp.statusCode);
  }

  return failure(res, "something went wrong", 500);
};

export default errorMiddleware;
