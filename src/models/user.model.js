const pool = require("../db/pool");
const { buildWhereClause } = require("../utils/queryBuilder");

class User {
  constructor(email, password, role = "user") {
    this.email = email;
    this.password = password;
    this.role = role;
  }

  async save(client = pool) {
    const result = await client.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *",
      [this.email, this.password, this.role],
    );
    const user = result.rows[0];
    this.id = user.id;
  }

  static async create({ email, password, role = "user" }, client = pool) {
    const result = await client.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *",
      [email, password, role],
    );
    const user = result.rows[0];
    return user;
  }

  static async findOne(data, client = pool) {
    const { queryPart, values } = buildWhereClause(data);
    const result = await client.query(
      `SELECT * FROM users ${queryPart}`,
      values,
    );
    const user = result.rows[0];
    return user;
  }

  static async findById(id, client = pool) {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = result.rows[0];
    return user;
  }
}

module.exports = User;
