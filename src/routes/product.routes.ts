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

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: Get all products
 *     tags:
 *       - Products
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of products
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  default: success
 *                data:
 *                  type: array
 *                  items:
 *                    $ref: '#/components/schemas/Product'
 *       500:
 *         $ref: '#/components/responses/Internal'
 */

router.get("/", getAllProductsValidator, getAllProductsController);

router.get("/:id", paramsValidator(["id"]), getProductController);

router.use(authGuard);
router.use(adminGuard);

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product
 *     tags:
 *       - Products
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:'#/components/schemas/CreateProduct'
 *     responses:
 *       201:
 *         description: Product created
 *         content:
 *           application/json:
 *             schema:
 *              type: object
 *              properties:
 *                status:
 *                  type: string
 *                  default: success
 *                data:
 *                  $ref: '#/components/schemas/Product'
 *
 *       400:
 *         description: Validation error
 *       401:
 *         description: Unauthorized
 *       500:
 *         $ref: '#/components/responses/Internal'
 */
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
