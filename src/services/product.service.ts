import AppError from "../utils/appError";
import { Prisma } from "@prisma/client";
import { prisma } from "./../db/prisma";

import { FindAllProductsParsedOptions } from "../types/product.types";

import {
  CreateProductInput,
  UpdateProductInput,
} from "../schemas/product.schema";

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
    ...(options.limit ? { take: options.limit } : {}),
    ...(options.offset ? { skip: options.offset } : {}),
  });

  const productCount = await prisma.products.aggregate({
    _count: { _all: true },
    where: {
      isActive: true,
      ...(filters as Prisma.ProductsWhereInput),
    },
  });

  const hasNext = options.limit
    ? (options.offset ?? 0) + options.limit < productCount._count._all
    : false;

  return { products, hasNext, totalCount: productCount._count._all };
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

export const addProduct = async (data: CreateProductInput) => {
  const { name, price } = data;
  const newProduct = await prisma.products.create({
    data: { name, price },
  });
  return newProduct;
};

export const updateProduct = async (id: number, data: UpdateProductInput) => {
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
