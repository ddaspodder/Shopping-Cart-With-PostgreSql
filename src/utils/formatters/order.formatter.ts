import { OrderResponse, OrderWithItemsRow } from "../../types/order.types";

export const orderFormatter = (
  order: OrderWithItemsRow[],
): OrderResponse | {} => {
  if (!order || order.length === 0) return {};
  const { id, user_id, status, total_amount, created_at, updated_at } =
    order[0] as OrderWithItemsRow;

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
    id: id.toString(),
    userId: user_id,
    items,
    status,
    totalAmount: total_amount,
    createdAt: created_at,
    updatedAt: updated_at,
  };
};

export const orderListFormatter = (
  orders: OrderWithItemsRow[],
): OrderResponse[] => {
  if (!orders || orders.length === 0) return [];

  const orderMap = new Map<number, OrderWithItemsRow[]>();
  for (const orderItem of orders) {
    const id = orderItem.id;
    if (orderMap.has(id)) {
      const orderItems = orderMap.get(id) as OrderWithItemsRow[];
      orderItems.push(orderItem);
    } else {
      orderMap.set(id, [orderItem]);
    }
  }

  const formattedOrders = [...orderMap.values()].map(
    (order) => orderFormatter(order) as OrderResponse,
  );
  return formattedOrders;
};

export const orderListGroupedByIdFormatter = (
  orders: OrderWithItemsRow[],
): OrderResponse[] => {
  if (!orders || orders.length === 0) return [];

  let order: OrderWithItemsRow[] = [];
  let orderId = -1;
  const formattedOrders: any[] = [];
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

  const formattedOrder = orderFormatter(order) as OrderResponse;
  formattedOrders.push(formattedOrder);

  return formattedOrders;
};
