import { RequestHandler } from "express";
import AppError from "../utils/appError";
import jwt from "jsonwebtoken";
import { getUserById } from "../services/auth.service";

export const authMiddleware: RequestHandler = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(new AppError("Unauthorized", 401));
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return next(new AppError("Unauthorized", 401));
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: number;
    };
    const userId = decoded.id;
    if (!userId) {
      return next(new AppError("Unauthorized", 401));
    }
    const user = await getUserById(Number(userId));
    if (!user) return next(new AppError("Unauthorized", 401));
    req.user = user;
    next();
  } catch {
    next(new AppError("Unauthorized", 401));
  }
};

export default authMiddleware;
