import { z } from "../docs/openapi";

export const productsQuerySchema = z.object({
  search: z
    .string("Search must be a string")
    .regex(/^(name):.+$/, "Search must be 'name:<text>'")
    .optional(),
  sort: z
    .string("Sort must be a string")
    .regex(
      /^(name|price):(asc|desc)$/,
      "Sort must be 'name:asc' or 'price:desc",
    )
    .optional(),
  limit: z.coerce.number().min(1, "Limit must be a positive number").optional(),
  offset: z.coerce
    .number()
    .min(0, "Offset must be a non-negative number")
    .optional(),
  name: z.string("Name must be a string").optional(),
  price_min: z.coerce
    .number("Price min must be a number")
    .min(0, "Price min must be a non-negative number")
    .optional(),
  price_max: z.coerce
    .number("Price max must be a number")
    .min(0, "Price max must be a non-negative number")
    .optional(),
});

export const productParamsSchema = z.object({
  id: z.coerce.number().int().nonnegative(),
});

export const createProductSchema = z.object({
  name: z.string({
    error: (issue) =>
      issue.input === undefined ? "Name is required" : "Name must be a string",
  }),
  price: z.coerce
    .number("Price must be a number")
    .nonnegative("Price must be a non-negative number"),
});

export const updateProductSchema = z.object({
  name: z.string("Name must be a string").optional(),
  price: z.coerce
    .number("Price must be a number")
    .nonnegative("Price must be a non-negative number")
    .optional(),
});

export const getAllProductsResponseSchema = z.object({
  products: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      price: z.string(),
      isActive: z.boolean(),
    }),
  ),
  hasNext: z.boolean(),
  totalCount: z.number(),
});

export const productSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.string(),
  isActive: z.boolean(),
});

export type ProductsQuery = z.infer<typeof productsQuerySchema>;
export type ProductParams = z.infer<typeof productParamsSchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
export type GetAllProductsResponse = z.infer<
  typeof getAllProductsResponseSchema
>;
export type ProductResponse = z.infer<typeof productSchema>;
