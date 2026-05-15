const mongoose = require("mongoose");
const { STATUS } = require("../constants/order.constants");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, required: true, min: 1 },
        price: { type: Number, required: true },
        itemTotal: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    status: { type: String, required: true, enum: Object.values(STATUS) },
  },
  { timestamps: true },
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
