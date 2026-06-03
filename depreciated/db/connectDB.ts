import pool from "./pool";

const connectDB = async () => {
  try {
    await pool.query("SELECT NOW()");
    console.log("Connected to PostgreSQL database.");
  } catch (error) {
    console.error("Error connecting to PostgreSQL database:", error);
  }
};

export default connectDB;
