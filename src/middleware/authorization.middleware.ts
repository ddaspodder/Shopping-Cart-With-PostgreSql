import type { RequestHandler } from "express";
import { ROLE } from "../constants/role.constansts";
import AppError from "../utils/appError";

export const authorizeRoles =
  (roles: string[]): RequestHandler =>
  (req, res, next) => {
    const user = req.user;
    if (!user || !roles.includes(user.role))
      return next(new AppError("User doesn't have required permission", 403));
    next();
  };

export const adminGuard = authorizeRoles([ROLE.ADMIN]);
