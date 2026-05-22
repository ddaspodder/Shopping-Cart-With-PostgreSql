const { getUpdateClause } = require("../src/utils/partialQuery");

require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const pool = require("../src/db/pool");

const runQuery = async () => {
  try {
    const data = {};
    const id = 5;
    const { queryPart, values } = getUpdateClause(data);
    const result = await pool.query(
      `UPDATE products ${queryPart} WHERE id = $${values.length + 1} RETURNING *`,
      [...values, id],
    );
    console.log(
      "Query run successfully:",
      `UPDATE products ${queryPart} WHERE id = $${values.length + 1} RETURNING *`,
      result.rows,
    );
  } catch (error) {
    console.error("Error running query:", error);
  }
};

runQuery();
