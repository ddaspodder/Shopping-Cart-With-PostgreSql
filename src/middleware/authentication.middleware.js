const User = require("../models/user.model");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized", 401));
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(new AppError("Unauthorized", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    if (!userId) {
      return next(new AppError("Unauthorized", 401));
    }
    const user = await User.findById(userId);
    if (!user) return next(new AppError("Unauthorized", 401));
    req.user = user;
    next();
  } catch {
    next(new AppError("Unauthorized", 401));
  }
};

module.exports = authMiddleware;
