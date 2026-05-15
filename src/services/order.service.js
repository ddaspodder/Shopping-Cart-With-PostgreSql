const { default: mongoose } = require("mongoose");
const Cart = require("../models/cart.model");
const Order = require("../models/order.model");
const AppError = require("../utils/appError");

const getOrders = (userId) => Order.find({ userId });

const getOrderById = async (userId, id) => {
  const order = await Order.findOne({ _id: id, userId });
  if (!order) throw new AppError("order doesnot exist", 404);
  return order;
};

const createOrder = async (userId) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const cart = await Cart.findOne({ userId })
      .session(session)
      .populate("items.productId");

    if (!cart || cart.items.length == 0)
      throw new AppError("shopping cart is empty", 400);

    const orderItems = cart.items.map((cartItem) => {
      const product = cartItem.productId;
      if (!product || !product.isActive)
        throw new AppError("some products in the cart are not available", 409);
      return {
        productId: product._id,
        quantity: cartItem.quantity,
        price: product.price,
        itemTotal: product.price * cartItem.quantity,
      };
    });

    const order = new Order({
      userId,
      items: orderItems,
      totalAmount: orderItems.reduce(
        (total, items) => total + items.itemTotal,
        0,
      ),
      status: "created",
    });

    await order.save({ session });

    cart.items = [];
    await cart.save({ session });

    await session.commitTransaction();

    return order;
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
};

const updateStatus = async (userId, id, status) => {
  const updatedOrder = await Order.findOneAndUpdate(
    { _id: id, userId },
    { status },
    { returnDocument: "after" },
  );

  if (!updatedOrder) throw new AppError("order doesnot exist", 404);

  return updatedOrder;
};

module.exports = { getOrders, createOrder, getOrderById, updateStatus };
