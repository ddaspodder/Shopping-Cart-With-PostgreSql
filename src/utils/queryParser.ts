import { ProductsQuery } from "../schemas/product.schema";
import {
  GetAllProductsQuery,
  ProductFilters,
  ProductSort,
  ParsedProductFilters,
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
    const key = param as keyof GetAllProductsQuery;
    const value = query[key] as string;
    switch (key) {
      case "search":
        const [searchField, pattern] = value.split(":") as [
          keyof ParsedProductFilters,
          string,
        ];
        filters[searchField] = { contains: pattern, mode: "insensitive" };
        break;
      case "sort":
        const [field, direction] = value.split(":") as [
          ProductSort["field"],
          ProductSort["direction"],
        ];
        sort.push({ field: field, direction: direction });
        break;
      case "limit":
        limit = parseInt(value);
        break;
      case "offset":
        offset = parseInt(value);
        break;
      default:
        filters[key] = value;
    }
  }
  return { filters, sort, limit, offset };
};

export default {
  getAllProductsQueryParser,
};
