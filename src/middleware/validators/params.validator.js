const AppError = require("../../utils/appError");

const paramsValidator = (pathNames) => {
  return (req, res, next) => {
    for (const pathName of pathNames) {
      if (!req.params[pathName]?.trim())
        return next(new AppError(`${pathName} is missing`, 400));
    }

    next();
  };
};

module.exports = { paramsValidator };
