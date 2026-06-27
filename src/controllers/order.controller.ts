import { Request, Response } from "express";
import {
  getOrders,
  createOrder,
  getOrderById,
  updateStatus,
} from "../services/order.service";
import asyncHandler from "../utils/asyncHandler";
import AppError from "../utils/appError";
import { success } from "../utils/responseHandler";

export const createOrderController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const order = await createOrder(userId);
    success(res, order, 201);
  },
);

export const getOrderController = asyncHandler(
  async (req: Request, res: Response) => {
    const userId = req.user!.id;
    const orders = await getOrders(userId);
    success(res, orders);
  },
);

export const getOrderByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) throw new AppError("bad id", 400);
    const order = await getOrderById(Number(id));
    success(res, order);
  },
);

export const updateStatusController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const { status } = req.body;
    if (!id) throw new AppError("bad id", 400);
    if (!status) throw new AppError("status is required", 400);
    const order = await updateStatus(Number(id), status);
    success(res, order);
  },
);
