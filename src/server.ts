import dotenv from "dotenv";

dotenv.config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

import http from "http";

import app from "./app";

import connectDB from "./db/connectDB";
connectDB();

const server = http.createServer(app);

server.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on port ${process.env.PORT || 8000}`);
});
