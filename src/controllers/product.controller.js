const asyncHandler = require("../utils/asyncHandler");
const {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} = require("../services/product.service");

const {
  productFormatter,
  productListFormatter,
} = require("../utils/formatters/product.formatter");

const AppError = require("../utils/appError");

const { success } = require("../utils/responseHandler");

const getAllProductsController = asyncHandler(async (req, res) => {
  const products = await getAllProducts();
  success(res, productListFormatter(products));
});

const getProductController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  if (!id) throw new AppError("bad id", 400);
  const product = await getProductById(id);
  success(res, productFormatter(product));
});

const addProductController = asyncHandler(async (req, res) => {
  const product = await addProduct(req.body);
  success(res, productFormatter(product), 201);
});

const updateProductController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  const product = await updateProduct(id, req.body);
  success(res, productFormatter(product));
});

const deleteProductController = asyncHandler(async (req, res) => {
  const id = req.params.id;
  await deleteProduct(id);
  success(res);
});

module.exports = {
  getAllProductsController,
  getProductController,
  addProductController,
  updateProductController,
  deleteProductController,
};
