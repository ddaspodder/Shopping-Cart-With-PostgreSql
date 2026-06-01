import { Request, Response } from "express";
import { register, signIn } from "../services/auth.service";
import asyncHandler from "../utils/asyncHandler";
import { success } from "../utils/responseHandler";
import { formatUser } from "../utils/formatters/user.formatter";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const { user, token } = await register(req.body);
    success(res, { user: formatUser(user), token }, 201);
  },
);

export const signInController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { token } = await signIn(email, password);
    success(res, { token }, 200);
  },
);
