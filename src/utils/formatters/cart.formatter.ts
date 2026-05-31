import { CartWithItemsRow, CartItemResponse } from "../../types/cart.types";

export const cartFormatter = (
  cart: CartWithItemsRow[],
): CartItemResponse | {} => {
  if (!cart || cart.length === 0) return {};
  const { id, user_id, created_at, updated_at } = cart[0] as CartWithItemsRow;
  const items = cart.map((item) => {
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
    createdAt: created_at,
    updatedAt: updated_at,
    items,
  };
};
