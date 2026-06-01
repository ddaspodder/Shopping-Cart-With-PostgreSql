import express from "express";
import bodyValidator from "../middleware/validators/body.validator";
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
router.post("/add", bodyValidator, addToCartController);
router.post("/remove", bodyValidator, removeFromCartController);
router.post("/clear", clearCartController);

export default router;
