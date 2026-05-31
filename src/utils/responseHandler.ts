import { Response } from "express";

export const success = <T>(res: Response, data: T, code = 200) => {
  res.status(code).json({
    status: "success",
    data: data ?? null,
  });
};

export const failure = (res: Response, message: string, code = 500) => {
  res.status(code).json({
    status: "failure",
    message: message || "internal server error",
  });
};
