import type { RequestHandler } from "express";
import type {
  GetAllProductsQuery,
  ParsedProductFilters,
  ProductSort,
} from "../../types/product.types";
import AppError from "../../utils/appError";

export const getAllProductsValidator: RequestHandler = (req, res, next) => {
  const { search, sort, limit, offset, ...params } =
    req.query as GetAllProductsQuery;

  const acceptableParams = new Set(["name", "price"]);

  for (let param of Object.keys(params)) {
    if (!acceptableParams.has(param))
      return next(new AppError(`invalid query parameter: ${param}`, 400));

    switch (param) {
      case "name":
        if (typeof params.name !== "string")
          return next(new AppError("invalid name filter", 400));
        break;
      case "price":
        if (isNaN(parseFloat(params.price as string)))
          return next(new AppError("invalid price filter", 400));
        break;
    }
  }

  if (search) {
    if (!search.includes(":"))
      return next(new AppError("invalid search parameter", 400));
    const [searchField, pattern] = search.split(":") as [
      keyof ParsedProductFilters,
      string,
    ];
    const acceptableSearchFields = new Set(["name"]);
    if (!acceptableSearchFields.has(searchField))
      return next(new AppError(`invalid search field: ${searchField}`, 400));
    if (!pattern) return next(new AppError("invalid search pattern", 400));
  }

  if (sort) {
    if (!sort.includes(":"))
      return next(new AppError("invalid sort parameter", 400));
    const [field, direction] = sort.split(":") as [
      ProductSort["field"],
      ProductSort["direction"],
    ];
    const acceptableSortFields = new Set(["name", "price"]);
    const acceptableSortDirections = new Set(["asc", "desc"]);
    if (!acceptableSortFields.has(field))
      return next(new AppError(`invalid sort field: ${field}`, 400));
    if (!acceptableSortDirections.has(direction))
      return next(new AppError(`invalid sort direction: ${direction}`, 400));
  }

  if (limit && (isNaN(parseInt(limit)) || parseInt(limit) < 1))
    return next(new AppError("invalid limit parameter", 400));
  if (offset && (isNaN(parseInt(offset)) || parseInt(offset) < 0))
    return next(new AppError("invalid offset parameter", 400));

  next();
};

export const createProductValidator: RequestHandler = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || typeof name !== "string")
    return next(new AppError("invalid name", 400));
  if (!price || typeof price !== "number")
    return next(new AppError("invalid price", 400));

  next();
};

export const updateProductValidator: RequestHandler = (req, res, next) => {
  const { name, price } = req.body;
  if (!name && !price)
    return next(new AppError("name or price is missing", 400));
  if (name && typeof name !== "string")
    return next(new AppError("invalid name", 400));
  if (price && typeof price !== "number")
    return next(new AppError("invalid price", 400));

  next();
};
