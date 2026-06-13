require("dotenv").config({ path: ".env.test" });
const connectDB = require("../depreciated/db/connectDB");

const pool = require("../depreciated/db/pool");

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
