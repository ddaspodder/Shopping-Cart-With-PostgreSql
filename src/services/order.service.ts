import pool from "../db/pool";
import Cart from "../models/cart.model";
import Order from "../models/order.model";
import AppError from "../utils/appError";
import { OrderWithItemsRow, STATUS } from "../types/order.types";

export const getOrders = (userId: number): Promise<OrderWithItemsRow[]> =>
  Order.findOrdersWithItemsByUserId(userId);

export const getOrderById = async (
  id: number,
): Promise<OrderWithItemsRow[]> => {
  const order = await Order.findOrderWithItemsById(id);
  if (order.length === 0) throw new AppError("order doesnot exist", 404);
  return order;
};

export const createOrder = async (
  userId: number,
): Promise<OrderWithItemsRow[]> => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const cart = await Cart.findCartItemsByUserId(userId, client);
    if (cart.length == 0)
      throw new AppError(
        "shopping cart is empty or products in the cart are not available",
        400,
      );
    const orderId = await Order.createOrder(userId, client);
    await Cart.deleteCartItemsByUserId(userId, client);
    await client.query("COMMIT");
    const order = await Order.findOrderWithItemsById(orderId);
    return order;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const updateStatus = async (
  id: number,
  status: STATUS,
): Promise<OrderWithItemsRow[]> => {
  const updatedOrderId = await Order.updateOrderStatus(id, status);
  if (!updatedOrderId) throw new AppError("order doesnot exist", 404);
  const updatedOrder = await Order.findOrderWithItemsById(updatedOrderId);
  return updatedOrder;
};
