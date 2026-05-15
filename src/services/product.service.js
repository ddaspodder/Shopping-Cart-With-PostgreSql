const AppError = require("../utils/appError");
const Product = require("../models/product.model");

const getAllProducts = async () => {
  const products = await Product.find({ isActive: true });
  return products;
};

const getProductById = async (id) => {
  const product = await Product.findById(id);
  if (!product) throw new AppError("product not found", 404);
  return product;
};

const getActiveProductById = async (id) => {
  const product = await Product.findOne({ _id: id, isActive: true });
  if (!product) throw new AppError("product not found", 404);
  return product;
};

const addProduct = async (data) => {
  const { name, price } = data;
  const newProduct = await Product.create({ name, price });
  return newProduct;
};

const updateProduct = async (id, data) => {
  const { name, price } = data;

  const updatedData = {};

  if (name) updatedData.name = name;
  if (price) updatedData.price = price;

  const product = await Product.findByIdAndUpdate(id, updatedData, {
    returnDocument: "after",
  });

  if (!product) throw new AppError("product doesn't exist", 404);
  return product;
};

const deleteProduct = async (id) => {
  const product = await Product.findByIdAndUpdate(
    id,
    { isActive: false },
    { returnDocument: "after" },
  );
  if (!product) throw new AppError("product doesn't exist", 404);
  return;
};

module.exports = {
  getAllProducts,
  getProductById,
  getActiveProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
