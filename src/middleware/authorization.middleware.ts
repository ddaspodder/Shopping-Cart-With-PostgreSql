import type { RequestHandler } from "express";
import { roles } from "@prisma/client";
import AppError from "../utils/appError";

export const authorizeRoles =
  (roles: string[]): RequestHandler =>
  (req, res, next) => {
    const user = req.user;
    if (!user || !roles.includes(user.role))
      return next(new AppError("Permission denied", 403));
    next();
  };

export const adminGuard = authorizeRoles([roles.admin]);
