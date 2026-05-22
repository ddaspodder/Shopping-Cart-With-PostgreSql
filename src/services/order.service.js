const pool = require("../db/pool");
const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const AppError = require("../utils/appError");

const getOrders = (userId) => Order.getOrdersByUserId(userId);

const getOrderById = async (userId, id) => {
  const order = await Order.getOrderById(userId, id);
  if (!order) throw new AppError("order doesnot exist", 404);
  return order;
};

const createOrder = async (userId) => {
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    const cart = await Cart.getCartItemsWithActiveProduct(userId, client);
    if (cart.length == 0)
      throw new AppError(
        "shopping cart is empty or products in the cart are not available",
        400,
      );
    const orderId = await Order.createOrder(userId, client);
    await Cart.clearCart(userId, client);
    await client.query("COMMIT");
    const order = await getOrderById(userId, orderId);
    return order;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const updateStatus = async (userId, id, status) => {
  const updatedOrderId = await Order.updateStatus(userId, id, status);
  if (!updatedOrderId) throw new AppError("order doesnot exist", 404);
  const updatedOrder = await getOrderById(userId, updatedOrderId);
  return updatedOrder;
};

module.exports = { getOrders, createOrder, getOrderById, updateStatus };
