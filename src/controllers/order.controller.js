const {
  getOrders,
  createOrder,
  getOrderById,
  updateStatus,
} = require("../services/order.service");
const asyncHandler = require("../utils/asyncHandler");

const {
  orderFormatter,
  orderListFormatter,
} = require("../utils/formatters/order.formatter");

const AppError = require("../utils/appError");

const { success } = require("../utils/responseHandler");

const createOrderController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const order = await createOrder(userId);
  success(res, orderFormatter(order), 201);
});

const getOrderController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const orders = await getOrders(userId);
  success(res, orderListFormatter(orders));
});

const getOrderByIdController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  if (!id) throw new AppError("bad id", 400);
  const order = await getOrderById(userId, id);
  success(res, orderFormatter(order));
});

const updateStatusController = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const id = req.params.id;
  const { status } = req.body;
  if (!id) throw new AppError("bad id", 400);
  if (!status) throw new AppError("status is required", 400);
  const order = await updateStatus(userId, id, status);
  success(res, orderFormatter(order));
});

module.exports = {
  createOrderController,
  getOrderController,
  getOrderByIdController,
  updateStatusController,
};
