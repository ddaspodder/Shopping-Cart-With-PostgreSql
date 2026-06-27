import {
  getAllProductsController,
  getProductController,
  addProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/product.controller";

import {
  getAllProductsValidator,
  createProductValidator,
  updateProductValidator,
} from "../middleware/validators/product.validator";

import { paramsValidator } from "../middleware/validators/params.validator";

import authGuard from "../middleware/authentication.middleware";
import { adminGuard } from "../middleware/authorization.middleware";
import bodyValidator from "../middleware/validators/body.validator";
import express from "express";

const router = express.Router();

router.get("/", getAllProductsValidator, getAllProductsController);

router.get("/:id", paramsValidator(["id"]), getProductController);

router.use(authGuard);
router.use(adminGuard);

router.post("/", bodyValidator, createProductValidator, addProductController);

router.patch(
  "/:id",
  paramsValidator(["id"]),
  bodyValidator,
  updateProductValidator,
  updateProductController,
);

router.delete("/:id", paramsValidator(["id"]), deleteProductController);

export default router;
