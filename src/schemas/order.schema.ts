import { z } from "../docs/openapi";
import { STATUS } from "../constants/order.constants";
import { productSchema } from "./product.schema";

export const orderParamsSchema = z.object({
  id: z.coerce.number().int().nonnegative(),
});

export const updateOrderStatusSchema = z.object({
  status: z.enum(STATUS, {
    error: (issue) =>
      issue.input === undefined ? "Status is required" : "Invalid status",
  }),
});

export const orderItemSchema = z.object({
  id: z.number(),
  orderId: z.number(),
  productId: z.number(),
  quantity: z.number(),
  price: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  products: productSchema,
});

export const orderResponseSchema = z.object({
  id: z.number(),
  userId: z.number(),
  totalAmount: z.string(),
  status: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  orderItems: z.array(orderItemSchema),
});

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
export type OrderParams = z.infer<typeof orderParamsSchema>;
export type OrderItemResponse = z.infer<typeof orderItemSchema>;
export type OrderResponse = z.infer<typeof orderResponseSchema>;
