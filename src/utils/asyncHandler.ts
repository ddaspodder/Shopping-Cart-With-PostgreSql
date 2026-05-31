import { Request, Response, NextFunction } from "express";

const asyncHandler =
  <T>(fn: (req: Request, res: Response, next: NextFunction) => Promise<T>) =>
  async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<T | void> => {
    try {
      return await fn(req, res, next);
    } catch (err) {
      next(err);
    }
  };

export default asyncHandler;
