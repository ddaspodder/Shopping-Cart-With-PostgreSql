const pool = require("../db/pool");
const {
  buildUpdateClause,
  buildWhereClause,
  buildFilterClause,
  buildSortClause,
} = require("../utils/queryBuilder");

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
    this.id = result.rows[0].id;
  }

  static async create({ name, price, isActive = true }, client = pool) {
    const result = await client.query(
      "INSERT INTO products (name, price, is_active) VALUES ($1, $2, $3) RETURNING *",
      [name, price, isActive],
    );
    return result.rows[0];
  }

  static async findAll({ filters, sort = [], limit, offset }, client = pool) {
    const { queryPart: filterQueryPart, values } = buildFilterClause(filters);
    const sortQueryPart = buildSortClause(sort);

    const aggregateValues = [...values];
    if (limit) aggregateValues.push(limit);
    if (offset) aggregateValues.push(offset);

    const limitQueryPart = limit ? `LIMIT $${values.length + 1}` : "";
    const offsetQueryPart = offset ? `OFFSET $${values.length + 2}` : "";

    const aggregatedQuery = `SELECT * FROM products ${filterQueryPart} ${sortQueryPart} ${limitQueryPart} ${offsetQueryPart}`;

    console.log(aggregatedQuery, aggregateValues);
    const result = await client.query(aggregatedQuery, aggregateValues);
    return result.rows;
  }

  static async findById(id, client = pool) {
    const result = await client.query("SELECT * FROM products WHERE id = $1", [
      id,
    ]);
    return result.rows[0];
  }

  static async findOne(data, client = pool) {
    const { queryPart, values } = buildWhereClause(data);

    const result = await client.query(
      `SELECT * FROM products ${queryPart}`,
      values,
    );
    return result.rows[0];
  }

  static async updateById(id, data, client = pool) {
    const { queryPart, values } = buildUpdateClause(data);
    const result = await client.query(
      `UPDATE products ${queryPart} WHERE id = $${values.length + 1} RETURNING *`,
      [...values, id],
    );
    return result.rows[0];
  }
}

module.exports = Product;
