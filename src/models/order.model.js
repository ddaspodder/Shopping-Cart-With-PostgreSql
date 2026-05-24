const pool = require("../db/pool");

const findOrdersWithItemsByUserId = async (userId, client = pool) => {
  const res = await client.query(
    `SELECT o.id, o.user_id, p.id as product_id, p.name, p.price, 
    oi.quantity, o.total_amount, o.status, o.created_at, o.updated_at
    FROM orders AS o INNER JOIN order_items AS oi ON o.id = oi.order_id
    INNER JOIN products AS p ON oi.product_id = p.id 
    where user_id = $1 AND p.is_active = TRUE ORDER BY o.id, oi.created_at DESC`,
    [userId],
  );
  return res.rows;
};

const findOrderWithItemsById = async (id, client = pool) => {
  const res = await client.query(
    `SELECT o.id, o.user_id, p.id as product_id, p.name, p.price, 
    oi.quantity, o.total_amount, o.status, o.created_at, o.updated_at
    FROM orders AS o INNER JOIN order_items AS oi ON o.id = oi.order_id
    INNER JOIN products AS p ON oi.product_id = p.id 
    where o.id = $1 AND p.is_active = TRUE 
    ORDER BY oi.created_at DESC`,
    [id],
  );
  return res.rows;
};

const createOrder = async (userId, client = pool) => {
  const res = await client.query(
    `INSERT INTO orders(user_id, total_amount) VALUES($1, 0) RETURNING id`,
    [userId],
  );

  const orderId = res.rows[0].id;

  await client.query(
    `INSERT INTO order_items(order_id, product_id, quantity, price) 
    SELECT $1, p.id, ci.quantity, p.price * ci.quantity 
    FROM carts as c INNER JOIN cart_items as ci ON c.id = ci.cart_id
    INNER JOIN products as p ON p.id = ci.product_id
    WHERE c.user_id = $2 AND p.is_active = TRUE`,
    [orderId, userId],
  );

  await client.query(
    `UPDATE orders SET total_amount = (
    SELECT SUM(price) FROM order_items WHERE order_id = $1) WHERE id = $1`,
    [orderId],
  );

  return orderId;
};

const updateOrderStatus = async (id, status, client = pool) => {
  const res = await client.query(
    `UPDATE orders SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2
    RETURNING id`,
    [status, id],
  );
  return res.rows[0]?.id;
};

module.exports = {
  findOrdersWithItemsByUserId,
  findOrderWithItemsById,
  createOrder,
  updateOrderStatus,
};
