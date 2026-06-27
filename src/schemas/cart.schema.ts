import { z } from "../docs/openapi";
import { productSchema } from "./product.schema";

export const updateCartSchema = z.object({
  productId: z.coerce
    .number("Product ID must be a number")
    .positive("Product ID must be a positive number"),
  quantity: z.coerce
    .number("Quantity must be a number")
    .int("Quantity must be an integer")
    .positive("Quantity must be a positive number")
    .optional(),
});

export const cartItemSchema = z.object({
  id: z.number(),
  cartId: z.number(),
  productId: z.number(),
  quantity: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  products: productSchema,
});

export const cartResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
  cartItems: z.array(cartItemSchema),
});

export type UpdateCartInput = z.infer<typeof updateCartSchema>;
export type CartItemResponse = z.infer<typeof cartItemSchema>;
export type CartResponse = z.infer<typeof cartResponseSchema>;
