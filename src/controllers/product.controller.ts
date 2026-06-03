import { Request, Response } from "express";
import asyncHandler from "../utils/asyncHandler";
import {
  getAllProducts,
  getProductById,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../services/product.service";
import { getAllProductsQueryParser } from "../utils/queryParser";
// import {
//   productFormatter,
//   productListFormatter,
// } from "../utils/formatters/product.formatter";
import AppError from "../utils/appError";
import { success } from "../../depreciated/utils/responseHandler";

export const getAllProductsController = asyncHandler(
  async (req: Request, res: Response) => {
    const { filters, sort, limit, offset } = getAllProductsQueryParser(
      req.query,
    );
    const products = await getAllProducts({ filters, sort, limit, offset });
    success(res, products);
  },
);

export const getProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    if (!id) throw new AppError("bad id", 400);
    const product = await getProductById(Number(id));
    success(res, product);
  },
);

export const addProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const product = await addProduct(req.body);
    success(res, product, 201);
  },
);

export const updateProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const product = await updateProduct(Number(id), req.body);
    success(res, product);
  },
);

export const deleteProductController = asyncHandler(
  async (req: Request, res: Response) => {
    const id = req.params.id;
    const product = await deleteProduct(Number(id));
    success(res, product);
  },
);
