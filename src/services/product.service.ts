import AppError from "../utils/appError";
import Product from "../models/product.model";
import {
  FindAllProductsParsedOptions,
  CreateProductBody,
  UpdateProductBody,
  ProductRow,
} from "../types/product.types";

export const getAllProducts = async ({
  filters,
  ...options
}: FindAllProductsParsedOptions): Promise<ProductRow[]> => {
  const products = await Product.findAll({
    filters: { isActive: true, ...filters },
    ...options,
  });
  return products;
};

export const getProductById = async (id: number): Promise<ProductRow> => {
  const product = await Product.findById(id);
  if (!product) throw new AppError("product not found", 404);
  return product;
};

export const getActiveProductById = async (id: number): Promise<ProductRow> => {
  const product = await Product.findOne({ id, isActive: true });
  if (!product) throw new AppError("product not found", 404);
  return product;
};

export const addProduct = async (
  data: CreateProductBody,
): Promise<ProductRow> => {
  const { name, price } = data;
  const newProduct = await Product.create({ name, price, isActive: true });
  return newProduct;
};

export const updateProduct = async (id: number, data: UpdateProductBody) => {
  const product = await Product.updateById(id, data);
  if (!product) throw new AppError("product doesn't exist", 404);
  return product;
};

export const deleteProduct = async (id: number): Promise<void> => {
  const product = await Product.updateById(id, { isActive: false });
  if (!product) throw new AppError("product doesn't exist", 404);
  return;
};

export default {
  getAllProducts,
  getProductById,
  getActiveProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
