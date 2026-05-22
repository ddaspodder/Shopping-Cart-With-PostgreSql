const cartFormatter = (cart) => {
  if (!cart || cart.length === 0) return {};
  const { id, user_id, created_at, updated_at } = cart[0];
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
    id,
    userId: user_id,
    createdAt: created_at,
    updatedAt: updated_at,
    items,
  };
};

module.exports = { cartFormatter };
