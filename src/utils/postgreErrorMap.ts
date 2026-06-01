import { DatabaseError } from "pg";

const constraintMap = {
  // products
  name_not_empty: {
    message: "Name must be a non-empty string",
    statusCode: 400,
  },
  price_non_negative: {
    message: "Price must be a non-negative value",
    statusCode: 400,
  },

  // users
  email_not_empty: {
    message: "Email must be a non-empty string",
    statusCode: 400,
  },
  password_not_empty: {
    message: "Password must be a non-empty string",
    statusCode: 400,
  },
  users_email_key: { message: "Email already exists", statusCode: 400 },

  // carts
  user_id_unique: { message: "User already has a cart", statusCode: 400 },
  carts_user_id_fkey: { message: "User does not exist", statusCode: 404 },

  // cart_items
  cart_items_cart_id_product_id_key: {
    message: "Product already in cart",
    statusCode: 400,
  },
  cart_items_quantity_check: {
    message: "Quantity must be a positive integer",
    statusCode: 400,
  },
  cart_items_cart_id_fkey: { message: "Cart does not exist", statusCode: 404 },
  cart_items_product_id_fkey: {
    message: "Product does not exist",
    statusCode: 404,
  },

  // orders
  total_amount_non_negative: {
    message: "Total amount must be a non-negative value",
    statusCode: 400,
  },
  orders_user_id_fkey: { message: "User does not exist", statusCode: 404 },

  // order_items
  unique_order_product: {
    message: "Order item already exists",
    statusCode: 400,
  },
  order_items_quantity_check: {
    message: "Quantity must be a positive integer",
    statusCode: 400,
  },
  order_items_price_check: {
    message: "Price must be a non-negative value",
    statusCode: 400,
  },
  order_items_order_id_fkey: {
    message: "Order does not exist",
    statusCode: 404,
  },
  order_items_product_id_fkey: {
    message: "Product does not exist",
    statusCode: 404,
  },
};

const codeMap = {
  23502: (err: DatabaseError) => ({
    message: `Missing required field ${err.column || "<field>"}`,
    statusCode: 400,
  }),
  "22P02": { message: "Invalid input syntax", statusCode: 400 },
  23514: { message: "Constraint validation failed", statusCode: 400 },
  23505: {
    message: "Duplicate key value violates unique constraint",
    statusCode: 400,
  },
  23503: { message: "Related resource does not exist", statusCode: 404 },
};

export function getPostgresErrorResponse(err: DatabaseError | unknown) {
  if (!err || typeof err !== "object" || !(err instanceof DatabaseError))
    return null;

  const constraint = err.constraint as keyof typeof constraintMap;
  const code = err.code as keyof typeof codeMap;

  if (err.constraint && constraintMap[constraint]) {
    return constraintMap[constraint];
  }

  if (err.code && codeMap[code]) {
    const entry = codeMap[code];
    if (typeof entry === "function") return entry(err);
    return entry;
  }

  return null;
}
