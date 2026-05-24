const AppError = require("../utils/appError");

const { failure } = require("../utils/responseHandler");

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof AppError) {
    return failure(res, err.message, err.statusCode);
  }

  // Map PostgreSQL errors (constraint-based first, then generic codes)
  const { getPostgresErrorResponse } = require("../utils/postgreErrorMap");
  const pgResp = getPostgresErrorResponse(err);
  if (pgResp) {
    return failure(res, pgResp.message, pgResp.statusCode);
  }

  return failure(res, "something went wrong", 500);
};

module.exports = errorMiddleware;
