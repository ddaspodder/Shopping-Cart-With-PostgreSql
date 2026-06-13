import { CreateUserInput, UserFilters, UserRow } from "../types/user.types";
import { DbClient } from "../db/db.types";
import pool from "../db/pool";
import { buildWhereClause } from "../utils/queryBuilder";

class User {
  email: string;
  password: string;
  role: string;
  id?: number;

  constructor(email: string, password: string, role = "user") {
    this.email = email;
    this.password = password;
    this.role = role;
  }

  async save(client: DbClient = pool): Promise<void> {
    const result = await client.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *",
      [this.email, this.password, this.role],
    );
    const user = result.rows[0];
    this.id = user.id;
  }

  static async create(
    { email, password, role = "user" }: CreateUserInput,
    client: DbClient = pool,
  ): Promise<UserRow> {
    const result = await client.query(
      "INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING id, email, role",
      [email, password, role],
    );
    const user = result.rows[0];
    return user;
  }

  static async findOne(
    data: UserFilters,
    client: DbClient = pool,
  ): Promise<UserRow & { password: string }> {
    const { queryPart, values } = buildWhereClause(data);
    const result = await client.query(
      `SELECT * FROM users ${queryPart}`,
      values,
    );
    const user = result.rows[0];
    return user;
  }

  static async findById(id: number, client: DbClient = pool): Promise<UserRow> {
    const result = await client.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const user = result.rows[0];
    return user;
  }
}

export default User;
