import { Request, Response } from "express";
import {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
} from "../services/cart.service";
import asyncHandler from "../utils/asyncHandler";
import AppError from "../utils/appError";
import { success } from "../utils/responseHandler";

export const getCartController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const cart = await getCart(userId);
    success(res, cart);
  },
);

export const addToCartController = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user!.id;
    if (!productId) throw new AppError("no product id", 400);
    const updatedItem = await addToCart(
      userId,
      Number(productId),
      Number(quantity),
    );
    success(res, updatedItem, 201);
  },
);

export const removeFromCartController = asyncHandler(
  async (req: Request, res: Response) => {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user!.id;
    if (!productId) throw new AppError("no product id", 400);
    const updatedItem = await removeFromCart(
      userId,
      Number(productId),
      Number(quantity),
    );
    success(res, updatedItem);
  },
);

export const clearCartController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const cart = await clearCart(userId);
    success(res, cart);
  },
);
