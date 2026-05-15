const {
  getAllProductsController,
  getProductController,
  addProductController,
  updateProductController,
  deleteProductController,
} = require("../controllers/product.controller");

const {
  createProductValidator,
  updateProductValidator,
} = require("../middleware/validators/product.validator");

const {
  paramsValidator,
} = require("../middleware/validators/params.validator");

const authGuard = require("../middleware/authentication.middleware");
const { adminGuard } = require("../middleware/authorization.middleware");

const bodyValidator = require("../middleware/validators/body.validator");

const express = require("express");

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

router.get("/", getAllProductsController);

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

module.exports = router;
