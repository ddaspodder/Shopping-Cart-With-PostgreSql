import { Request, Response, NextFunction } from "express";
import AppError from "../../utils/appError";

export const paramsValidator = (pathNames: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    for (const pathName of pathNames) {
      const param = req.params[pathName];
      if (!param) return next(new AppError(`${pathName} is missing`, 400));
    }

    next();
  };
};
