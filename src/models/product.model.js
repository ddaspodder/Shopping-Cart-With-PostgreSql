const pool = require("../db/pool");
const { getUpdateClause, getWhereClause } = require("../utils/partialQuery");

class Product {
  constructor(name, price, isActive = true) {
    this.name = name;
    this.price = price;
    this.isActive = isActive;
  }

  async save(client = pool) {
    const result = await client.query(
      "INSERT INTO products (name, price, is_active) VALUES ($1, $2, $3) RETURNING *",
      [this.name, this.price, this.isActive],
    );
    return result.rows[0];
  }

  static async create({ name, price, isActive = true }, client = pool) {
    const result = await client.query(
      "INSERT INTO products (name, price, is_active) VALUES ($1, $2, $3) RETURNING *",
      [name, price, isActive],
    );
    return result.rows[0];
  }

  static async find(data, client = pool) {
    const { queryPart, values } = getWhereClause(data);
    const result = await client.query(
      `SELECT * FROM products ${queryPart}`,
      values,
    );
    return result.rows;
  }

  static async findById(id, client = pool) {
    const result = await client.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  }

  static async findOne(data, client = pool) {
    const { queryPart, values } = getWhereClause(data);

    const result = await client.query(
      `SELECT * FROM products ${queryPart}`,
      values,
    );
    return result.rows[0];
  }

  static async findByIdAndUpdate(id, data, client = pool) {
    const { queryPart, values } = getUpdateClause(data);
    const result = await client.query(
      `UPDATE products ${queryPart} WHERE id = $${values.length + 1} RETURNING *`,
      [...values, id],
    );
    return result.rows[0];
  }
}

module.exports = Product;
