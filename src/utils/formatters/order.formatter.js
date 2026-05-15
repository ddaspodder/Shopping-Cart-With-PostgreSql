const orderFormatter = (order) => {
  return {
    id: order._id.toString(),
    userId: order.userId,
    items: order.items.map((item) => ({
      productId: item.productId,
      quantity: item.quantity,
      price: item.price,
      itemTotal: item.itemTotal,
    })),
    totalAmount: order.totalAmount,
    status: order.status,
    createdAt: order.createdAt,
    updatedAt: order.updatedAt,
  };
};

const orderListFormatter = (orders) => {
  return orders.map(orderFormatter);
};

module.exports = { orderFormatter, orderListFormatter };
