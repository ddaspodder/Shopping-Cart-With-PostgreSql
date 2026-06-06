import type { RequestHandler } from "express";
import AppError from "../../utils/appError";

const bodyValidator: RequestHandler = (req, res, next) => {
  const body = req.body;
  console.log("body", body);
  if (!body || typeof body !== "object" || Object.keys(body).length === 0) {
    return next(new AppError("body is empty or invalid", 400));
  }
  next();
};

export default bodyValidator;
