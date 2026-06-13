import { ProductsQuery } from "../schemas/product.schema";
import {
  ProductFilters,
  ProductSort,
  FindAllProductsParsedOptions,
} from "../types/product.types";

export const getAllProductsQueryParser = (
  query: ProductsQuery,
): FindAllProductsParsedOptions => {
  const filters: ProductFilters = {};
  const sort: ProductSort[] = [];
  let limit;
  let offset;

  for (let param of Object.keys(query)) {
    const key = param as keyof ProductsQuery;
    const value = query[key];
    switch (key) {
      case "search":
        const [searchField, pattern] = (value as string).split(":") as [
          "name",
          string,
        ];
        filters[searchField] = { contains: pattern, mode: "insensitive" };
        break;
      case "sort":
        const [field, direction] = (value as string).split(":") as [
          ProductSort["field"],
          ProductSort["direction"],
        ];
        sort.push({ field: field, direction: direction });
        break;
      case "limit":
        limit = value as number;
        break;
      case "offset":
        offset = value as number;
        break;
      case "price_min":
        filters.price = { gte: value as number };
        break;
      case "price_max":
        filters.price = { lte: value as number };
        break;
      default:
        filters[key] = value as string;
    }
  }
  return { filters, sort, limit, offset };
};

export default {
  getAllProductsQueryParser,
};
