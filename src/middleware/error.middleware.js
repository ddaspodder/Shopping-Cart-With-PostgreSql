const AppError = require("../utils/appError");

const { failure } = require("../utils/responseHandler");

const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  if (err instanceof AppError) {
    return failure(res, err);
  }

  return failure(res, "something went wrong", 500);
};

module.exports = errorMiddleware;
