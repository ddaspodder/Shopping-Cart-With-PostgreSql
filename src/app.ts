import type { Request, Response, NextFunction } from "express";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger";
import productRoutes from "./routes/product.routes";
import cartRoutes from "./routes/cart.routes";
import orderRoutes from "./routes/order.routes";
import authRoutes from "./routes/auth.routes";
import errorMiddleware from "./middleware/error.middleware";
import AppError from "./utils/appError";

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
    origin: [process.env.CLIENT_URL!],
    credentials: true,
  }),
);

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

app.get("/", (req: Request, res: Response) => {
  res.send("Express and PostgreSql Shopping API");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError("invalid route", 404));
});

app.use(errorMiddleware);

export default app;
