import {
  getAllProductsResponseSchema,
  productsQuerySchema,
  productParamsSchema,
  productSchema,
} from "../schemas/product.schema";
import {
  failureResponseSchema,
  successResponseSchema,
} from "../schemas/status.schema";

import { registry } from "./registry";

registry.register("ProductParams", productParamsSchema);
registry.register("ProductsQuery", productsQuerySchema);
registry.register(
  "GetAllProductsResponse",
  successResponseSchema(getAllProductsResponseSchema),
);
registry.register("ProductResponse", successResponseSchema(productSchema));

registry.registerPath({
  method: "get",
  path: "/products/{id}",
  description: "Get product by id",
  tags: ["Products"],
  request: {
    params: productParamsSchema,
  },
  responses: {
    200: {
      description: "Product",
      content: {
        "application/json": {
          schema: successResponseSchema(productSchema),
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: failureResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "get",
  path: "/products",
  description: "Get products",
  tags: ["Products"],
  request: {
    query: productsQuerySchema,
  },
  responses: {
    200: {
      description: "Product",
      content: {
        "application/json": {
          schema: successResponseSchema(getAllProductsResponseSchema),
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: failureResponseSchema,
        },
      },
    },
  },
});
