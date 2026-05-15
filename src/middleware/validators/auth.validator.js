const AppError = require("../../utils/appError");

const emailValidator = (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new AppError("Email is required", 400));
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new AppError("Invalid email format", 400));
  }
  next();
};

const passwordValidator = (req, res, next) => {
  const { password } = req.body;
  if (!password) return next(new AppError("Password is required", 400));
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (!passwordRegex.test(password)) {
    return next(
      new AppError(
        "Password must contain at least one letter and one number and be at least 6 characters long",
        400,
      ),
    );
  }
  next();
};

const authValidator = [emailValidator, passwordValidator];

module.exports = { emailValidator, passwordValidator, authValidator };
