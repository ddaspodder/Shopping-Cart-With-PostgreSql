import type { ErrorRequestHandler } from "express";
import AppError from "../utils/appError";
import { failure } from "../utils/responseHandler";
import { getPrismaErrorResponse } from "../utils/prismaErrorMap";

const errorMiddleware: ErrorRequestHandler = (err, req, res, next) => {
  console.error((err as Error).stack);

  if (err instanceof AppError) {
    return failure(res, err.message, err.statusCode);
  }

  const prismaErrResp = getPrismaErrorResponse(err);
  if (prismaErrResp) {
    return failure(res, prismaErrResp.message, prismaErrResp.statusCode);
  }

  return failure(res, "something went wrong", 500);
};

export default errorMiddleware;
