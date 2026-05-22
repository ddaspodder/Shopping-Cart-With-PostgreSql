const http = require("http");

const app = require("./app");

const connectDB = require("./db/connectDB");
connectDB();

const server = http.createServer(app);

server.listen(process.env.PORT || 8000, () => {
  console.log(`Server running on port ${process.env.PORT || 8000}`);
});
