import { z } from "zod";
import { STATUS } from "../src/constants/order.constants";

const createProductSchema = z.object({
  name: z.string({ error: "Name is required" }),
  price: z.string({
    error: (issue) =>
      issue.input === undefined ? "Price is required" : issue.message,
  }),
});

const product = {
  name: "Bag",
  price: true,
};
const validateProduct = () => {
  const result = createProductSchema.safeParse(product);
  console.log(result);
};

export const updateCartSchema = z.object({
  productId: z
    .string({
      error: (issue) =>
        issue.input === undefined ? "Product ID is required" : issue.message,
    })
    .transform(Number)
    .pipe(
      z
        .number("Product ID must be a number")
        .nonnegative("Product ID must be a non-negative number"),
    ),
});

const cart = { productId: 1 };

const validateCart = () => {
  const result = updateCartSchema.safeParse(cart);
  console.log(result);
};

const email = { email: "tets" };

const emailSchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === undefined ? "Email is required" : "Invalid email format",
  }),
});

const validateEmail = () => {
  const result = emailSchema.safeParse(email);
  console.log(result);
};

export const updateOrderStatusSchema = z.object({
  status: z.enum(STATUS, {
    error: (issue) =>
      issue.input === undefined ? "Status is required" : "Invalid status",
  }),
});

const orderStatus = {
  //   status: "shipped",
};
const validateOrderStatus = () => {
  const result = updateOrderStatusSchema.safeParse(orderStatus);
  console.log(result);
};

validateOrderStatus();
