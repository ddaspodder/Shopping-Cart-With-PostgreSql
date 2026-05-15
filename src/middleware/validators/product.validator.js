const AppError = require("../../utils/appError");

const createProductValidator = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || typeof name !== "string")
    return next(new AppError("invalid name", 400));
  if (!price || typeof price !== "number")
    return next(new AppError("invalid price", 400));

  next();
};

const updateProductValidator = (req, res, next) => {
  const { name, price } = req.body;
  if (!name && !price)
    return next(new AppError("name or price is missing", 400));
  if (name && typeof name !== "string")
    return next(new AppError("invalid name", 400));
  if (price && typeof price !== "number")
    return next(new AppError("invalid price", 400));

  next();
};

module.exports = {
  createProductValidator,
  updateProductValidator,
};
