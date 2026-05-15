const AppError = require("../../utils/appError");

const bodyValidator = (req, res, next) => {
  const body = req.body;

  if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
    return next(new AppError("body is empty or invalid", 400));
  }
  next();
};

module.exports = bodyValidator;
