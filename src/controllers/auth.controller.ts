import { Request, Response } from "express";
import { register, signIn, getUserDetails } from "../services/auth.service";
import asyncHandler from "../utils/asyncHandler";
import { success } from "../utils/responseHandler";

export const registerController = asyncHandler(
  async (req: Request, res: Response) => {
    const { user, token } = await register(req.body);
    success(res, { user: user, token }, 201);
  },
);

export const signInController = asyncHandler(
  async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const { token } = await signIn(email, password);
    success(res, { token }, 200);
  },
);

export const getUserDetailsController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const user = await getUserDetails(userId);
    success(res, user);
  },
);
