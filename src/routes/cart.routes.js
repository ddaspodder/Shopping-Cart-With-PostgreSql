const express = require("express");
const routes = express.Router();
const bodyValidator = require("../middleware/validators/body.validator");

const {
  getCartController,
  addToCartController,
  removeFromCartController,
  clearCartController,
} = require("../controllers/cart.controller");

const authGuard = require("../middleware/authentication.middleware");

routes.use(authGuard);

routes.get("/", getCartController);
routes.post("/add", bodyValidator, addToCartController);
routes.post("/remove", bodyValidator, removeFromCartController);
routes.post("/clear", clearCartController);

module.exports = routes;
