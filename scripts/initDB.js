const path = require("path");

const fs = require("fs");

require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const pool = require("../src/db/pool");
const rootPath = process.cwd();

const schemaPath = path.resolve(rootPath, "src", "db", "schemas");

const schemaFiles = [
  "products.sql",
  // "roles.sql",
  "users.sql",
  "carts.sql",
  "cart_items.sql",
  // "statuses.sql",
  "orders.sql",
  "order_items.sql",
];

const initDB = async () => {
  try {
    for (const file of schemaFiles) {
      const filePath = path.resolve(schemaPath, file);
      const schema = await fs.readFileSync(filePath, "utf-8");
      await pool.query(schema);
    }
    console.log("Database initialized.");
  } catch (error) {
    console.error("Error initializing database:", error);
  }
};

initDB();
