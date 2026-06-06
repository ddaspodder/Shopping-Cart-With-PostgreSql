import { prisma } from "../db/prisma";
import { type Orders } from "@prisma/client";
import AppError from "../utils/appError";
import { clearCart } from "./cart.service";

export const getOrders = async (userId: number) => {
  const orders = await prisma.orders.findMany({
    where: { userId },
    include: {
      orderItems: {
        include: {
          products: true,
        },
      },
    },
  });
  return orders;
};

export const getOrderById = async (id: number) => {
  const order = await prisma.orders.findUnique({
    where: { id },
    include: {
      orderItems: {
        include: {
          products: true,
        },
      },
    },
  });
  if (!order) throw new AppError("order doesnot exist", 404);
  return order;
};

export const createOrder = async (userId: number) => {
  return prisma.$transaction(async (tx) => {
    const cart = await tx.carts.findUnique({
      where: { userId },
      include: {
        cartItems: {
          include: {
            products: true,
          },
        },
      },
    });
    if (cart?.cartItems.length == 0)
      throw new AppError(
        "shopping cart is empty or products in the cart are not available",
        400,
      );

    const orderItems = cart?.cartItems.map(
      ({ productId, quantity, products: { price } }) => ({
        productId,
        quantity,
        price: Number(price) * quantity,
      }),
    );

    const totalAmount =
      orderItems?.reduce((acc, curr) => acc + curr.price, 0) ?? 0;

    const order = await tx.orders.create({
      data: {
        userId,
        totalAmount,
        orderItems: { create: orderItems },
      },
      include: {
        orderItems: {
          include: {
            products: true,
          },
        },
      },
    });

    await clearCart(userId);

    return order;
  });
};

export const updateStatus = async (id: number, status: Orders["status"]) => {
  await getOrderById(id);
  const updatedOrder = await prisma.orders.update({
    where: { id },
    data: { status },
    include: {
      orderItems: {
        include: {
          products: true,
        },
      },
    },
  });

  return updatedOrder;
};
