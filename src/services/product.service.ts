import AppError from "../utils/appError";
import { Prisma } from "@prisma/client";
import { prisma } from "./../db/prisma";

import {
  FindAllProductsParsedOptions,
  CreateProductBody,
  UpdateProductBody,
} from "../types/product.types";

export const getAllProducts = async ({
  filters,
  ...options
}: FindAllProductsParsedOptions) => {
  const sort = options.sort?.map((sort) => {
    return { [sort.field]: sort.direction };
  });

  const products = await prisma.products.findMany({
    where: { isActive: true, ...(filters as Prisma.ProductsWhereInput) },
    orderBy: sort,
    take: options.limit,
    skip: options.offset,
  });
  return products;
};

export const getProductById = async (id: number) => {
  const product = await prisma.products.findUnique({
    where: { id },
  });
  if (!product) throw new AppError("product not found", 404);
  return product;
};

export const getActiveProductById = async (id: number) => {
  const product = await prisma.products.findUnique({
    where: { id, isActive: true },
  });
  if (!product) throw new AppError("product not found", 404);
  return product;
};

export const addProduct = async (data: CreateProductBody) => {
  const { name, price } = data;
  const newProduct = await prisma.products.create({
    data: { name, price },
  });
  return newProduct;
};

export const updateProduct = async (id: number, data: UpdateProductBody) => {
  await getActiveProductById(id);
  const product = await prisma.products.update({
    where: { id },
    data,
  });
  return product;
};

export const deleteProduct = async (id: number) => {
  await getActiveProductById(id);
  const product = await prisma.products.update({
    where: { id },
    data: { isActive: false },
  });
  return product;
};

export default {
  getAllProducts,
  getProductById,
  getActiveProductById,
  addProduct,
  updateProduct,
  deleteProduct,
};
