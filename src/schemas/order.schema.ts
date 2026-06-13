import { z } from "zod";
import { STATUS } from "../constants/order.constants";

export const updateOrderStatusSchema = z.object({
  status: z.enum(STATUS, {
    error: (issue) =>
      issue.input === undefined ? "Status is required" : "Invalid status",
  }),
});

export type UpdateOrderStatusInput = z.infer<typeof updateOrderStatusSchema>;
