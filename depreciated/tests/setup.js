require("dotenv").config({ path: ".env.test" });
const connectDB = require("../db/connectDB");

const pool = require("../db/pool");

beforeAll(async () => {
  await connectDB();
});

beforeEach(async () => {
  await pool.query(
    "TRUNCATE TABLE order_items, orders, carts, cart_items, products, users RESTART IDENTITY CASCADE",
  );
});

afterAll(async () => {
  await pool.end();
});
