const pool = require("./pool");

const connectDB = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Connected to PostgreSQL database.");
  } catch (error) {
    console.error("Error connecting to PostgreSQL database:", error);
  }
};

module.exports = connectDB;
