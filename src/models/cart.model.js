const pool = require("../db/pool");

const findCartByUserId = async (userId, client = pool) => {
  const res = await client.query("SELECT * FROM carts WHERE user_id = $1", [
    userId,
  ]);
  return res.rows[0];
};

const getCartItemsWithActiveProduct = async (userId, client = pool) => {
  const res = await client.query(
    `SELECT c.id, c.user_id, c.created_at, c.updated_at,
      p.id as product_id, p.name, p.price, ci.quantity  
      FROM carts as c INNER JOIN cart_items as ci ON c.id = ci.cart_id
      INNER JOIN products as p ON p.id = ci.product_id WHERE c.user_id = $1 AND p.is_active = TRUE
      ORDER BY ci.created_at DESC`,
    [userId],
  );
  return res.rows;
};

const create = async (userId, client = pool) => {
  const res = await client.query(
    "INSERT INTO carts(user_id) VALUES($1) RETURNING id",
    [userId],
  );
  return res.rows[0].id;
};

const createCartItem = async (cartId, productId, quantity, client = pool) => {
  const res = await client.query(
    "INSERT INTO cart_items(cart_id, product_id, quantity) VALUES($1, $2, $3) RETURNING id",
    [cartId, productId, quantity],
  );
  return res.rows[0].id;
};

const findCartItem = async (cartId, productId, client = pool) => {
  const res = await client.query(
    "SELECT id, quantity FROM cart_items WHERE cart_id = $1 AND product_id = $2",
    [cartId, productId],
  );
  return res.rows[0];
};

const increaseCartItemQuantity = async (
  cartItemId,
  quantity,
  client = pool,
) => {
  await client.query(
    "UPDATE cart_items SET quantity = quantity + $1 WHERE id = $2",
    [quantity, cartItemId],
  );
};

const decreaseCartItemQuantity = async (
  cartItemId,
  quantity,
  client = pool,
) => {
  await client.query(
    "UPDATE cart_items SET quantity = quantity - $1 WHERE id = $2",
    [quantity, cartItemId],
  );
};

const deleteCartItem = async (cartItemId, client = pool) => {
  await client.query("DELETE FROM cart_items WHERE id = $1", [cartItemId]);
};

const clearCart = async (userId, client = pool) => {
  await client.query("DELETE FROM carts WHERE user_id = $1", [userId]);
  return null;
};

module.exports = {
  create,
  findCartByUserId,
  getCartItemsWithActiveProduct,
  clearCart,
  deleteCartItem,
  increaseCartItemQuantity,
  decreaseCartItemQuantity,
  createCartItem,
  findCartItem,
};
