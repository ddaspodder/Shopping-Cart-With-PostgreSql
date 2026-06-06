import { z } from "zod";

export const productsQuerySchema = z.object({
  search: z
    .string("Search must be a string")
    .regex(/^(name):.+$/, "Search must be 'name:<text>' or 'price:<text>'")
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
  price: z.coerce.number("Price must be a number").optional(),
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

export type ProductsQuery = z.infer<typeof productsQuerySchema>;
export type CreateProductInput = z.infer<typeof createProductSchema>;
export type UpdateProductInput = z.infer<typeof updateProductSchema>;
