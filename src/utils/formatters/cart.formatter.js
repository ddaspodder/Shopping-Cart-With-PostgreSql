const cartFormatter = (cart) => {
  if (!cart || !cart._id) return {};
  return {
    id: cart._id.toString(),
    items: cart.items,
  };
};

module.exports = { cartFormatter };
