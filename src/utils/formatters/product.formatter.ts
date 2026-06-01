import { ProductRow, ProductResponse } from "../../types/product.types";

export const productFormatter = (product: ProductRow): ProductResponse => {
  return {
    id: product.id.toString(),
    name: product.name,
    price: product.price,
  };
};

export const productListFormatter = (
  products: ProductRow[],
): ProductResponse[] => {
  return products.map(productFormatter);
};
