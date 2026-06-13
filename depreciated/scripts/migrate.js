const path = require("path");
const migratePath = path.resolve(process.cwd(), "src", "db", "migrations");

const fs = require("fs");

const { setupEnv } = require("../src/utils/configureEnvironment");
setupEnv();

const pool = require("../src/db/pool");

const runMigrations = async () => {
  try {
    await pool.query(
      `CREATE TABLE IF NOT EXISTS migration(
        id SERIAL PRIMARY KEY, 
        filename TEXT,
        applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )`,
    );

    const res = await pool.query("SELECT filename FROM migration");

    const appliedMigrations = new Set(res.rows.map((row) => row.filename));

    const fileNames = fs
      .readdirSync(migratePath)
      .filter((file) => file.endsWith(".sql"))
      .sort();

    for (const fileName of fileNames) {
      if (!appliedMigrations.has(fileName)) {
        const filePath = path.resolve(migratePath, fileName);
        const migration = await fs.readFileSync(filePath, "utf-8");
        await pool.query(migration);
        await pool.query("INSERT INTO migration (filename) VALUES ($1)", [
          fileName,
        ]);
        console.log(`Migration ${fileName} applied successfully.`);
      }
    }
  } catch (error) {
    console.error("Error running migrations:", error);
  }
};
runMigrations();
