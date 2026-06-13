import express from "express";
import bodyValidator from "../middleware/validators/body.validator";
import { updateCartValidator } from "../middleware/validators/cart.validator";
import {
  getCartController,
  addToCartController,
  removeFromCartController,
  clearCartController,
} from "../controllers/cart.controller";
import authGuard from "../middleware/authentication.middleware";

const router = express.Router();

router.use(authGuard);
router.get("/", getCartController);
router.post("/add", bodyValidator, updateCartValidator, addToCartController);
router.post(
  "/remove",
  bodyValidator,
  updateCartValidator,
  removeFromCartController,
);
router.post("/clear", clearCartController);

export default router;
