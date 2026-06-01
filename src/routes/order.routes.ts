import {
  getOrderController,
  createOrderController,
  getOrderByIdController,
  updateStatusController,
} from "../controllers/order.controller";
import { updateStatusValidator } from "../middleware/validators/order.validator";
import express from "express";
import { paramsValidator } from "../middleware/validators/params.validator";
import bodyValidator from "../middleware/validators/body.validator";
import authGuard from "../middleware/authentication.middleware";

const routes = express.Router();

routes.use(authGuard);

routes.post("/", createOrderController);
routes.get("/", getOrderController);
routes.get("/:id", paramsValidator(["id"]), getOrderByIdController);
routes.patch(
  "/:id/status",
  paramsValidator(["id"]),
  bodyValidator,
  updateStatusValidator,
  updateStatusController,
);

export default routes;
