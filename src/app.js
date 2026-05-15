const express = require("express");

require("dotenv").config({
  path: process.env.NODE_ENV === "test" ? ".env.test" : ".env",
});

const helmet = require("helmet");

const cors = require("cors");

const rateLimit = require("express-rate-limit");

const swaggerUi = require("swagger-ui-express");

const swaggerSpec = require("./swagger/swagger");

const app = express();

app.use(helmet());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  }),
);

app.use(
  cors({
    origin: [process.env.CLIENT_URL],
    credentials: true,
  }),
);

const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const authRoutes = require("./routes/auth.routes");

const errorMiddleware = require("./middleware/error.middleware");
const AppError = require("./utils/appError");

app.use(express.json());

app.use(
  "/api/auth",
  rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // limit each IP to 20 requests per windowMs for auth routes
  }),
);

app.use("/api/auth", authRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("Express and MongoDB Shopping API");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req, res, next) => {
  next(new AppError("invalid route", 404));
});

app.use(errorMiddleware);

module.exports = app;
