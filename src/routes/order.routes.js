const {
  getOrderController,
  createOrderController,
  getOrderByIdController,
  updateStatusController,
} = require("../controllers/order.controller");

const {
  updateStatusValidator,
} = require("../middleware/validators/order.validator");

const express = require("express");
const {
  paramsValidator,
} = require("../middleware/validators/params.validator");
const bodyValidator = require("../middleware/validators/body.validator");
const routes = express.Router();

const authGuard = require("../middleware/authentication.middleware");

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

module.exports = routes;
