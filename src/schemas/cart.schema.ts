import { z } from "zod";

export const updateCartSchema = z.object({
  productId: z.coerce
    .number("Product ID must be a number")
    .positive("Product ID must be a positive number"),
});

export type UpdateCartInput = z.infer<typeof updateCartSchema>;
