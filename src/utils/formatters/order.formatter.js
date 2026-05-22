const orderFormatter = (order) => {
  if (!order || order.length === 0) return {};
  const { id, user_id, status, total_amount, created_at, updated_at } =
    order[0];

  const items = order.map((item) => {
    const { product_id, name, price, quantity } = item;
    return {
      productId: product_id,
      name,
      price,
      quantity,
    };
  });

  return {
    id,
    userId: user_id,
    items,
    status,
    totalAmount: total_amount,
    createdAt: created_at,
    updatedAt: updated_at,
  };
};

const orderListFormatter = (orders) => {
  if (!orders || orders.length === 0) return {};

  let order = [];
  let orderId = -1;
  const formattedOrders = [];
  for (const orderItem of orders) {
    const { id } = orderItem;
    if (id === orderId) {
      order.push(orderItem);
    } else {
      if (orderId != -1) {
        const formattedOrder = orderFormatter(order);
        formattedOrders.push(formattedOrder);
      }
      orderId = id;
      order = [orderItem];
    }
  }

  const formattedOrder = orderFormatter(order);
  formattedOrders.push(formattedOrder);

  return formattedOrders;
};

module.exports = { orderFormatter, orderListFormatter };
