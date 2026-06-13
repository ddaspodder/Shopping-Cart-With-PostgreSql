import AppError from "../utils/appError";
import { prisma } from "../db/prisma";

export const getCart = async (userId: number) => {
  const cart = await prisma.carts.findUnique({ where: { userId } });
  if (!cart) {
    throw new AppError("Cart not found", 404);
  }
  //delete all cart items with inactive products for the particular user
  await prisma.cartItems.deleteMany({
    where: {
      carts: { userId },
      products: {
        isActive: false,
      },
    },
  });

  //find all cart with items(which has active products)
  const cartWithItems = await prisma.carts.findUnique({
    where: { userId },
    include: {
      cartItems: {
        where: {
          products: {
            isActive: true,
          },
        },
        include: {
          products: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });
  return cartWithItems;
};

export const addToCart = async (
  userId: number,
  productId: number,
  quantity: number,
) => {
  return prisma.$transaction(async (tx) => {
    const activeProduct = await tx.products.findUnique({
      where: {
        id: productId,
        isActive: true,
      },
    });

    if (!activeProduct) throw new AppError("product not found", 404);

    const cart = await tx.carts.findUnique({ where: { userId } });

    if (!cart) {
      await tx.carts.create({
        data: { userId, cartItems: { create: { productId, quantity } } },
      });
    } else {
      const cartId = cart.id;
      await tx.cartItems.upsert({
        create: { cartId, productId, quantity },
        update: { quantity: { increment: quantity } },
        where: { cartId_productId: { cartId, productId } },
      });
    }
    const updated = await tx.carts.findUnique({
      where: { userId },
      include: {
        cartItems: {
          include: { products: true },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return updated;
  });
};

export const removeFromCart = async (
  userId: number,
  productId: number,
  quantity: number,
) => {
  return prisma.$transaction(async (tx) => {
    const activeProduct = await tx.products.findUnique({
      where: {
        id: productId,
        isActive: true,
      },
    });
    if (!activeProduct) throw new AppError("product not found", 404);

    const cart = await tx.carts.findUnique({ where: { userId } });

    if (!cart) {
      throw new AppError("Cart not found", 404);
    } else {
      const cartId = cart.id;
      const cartItem = await tx.cartItems.findUnique({
        where: { cartId_productId: { cartId, productId } },
      });
      if (!cartItem) {
        throw new AppError("Product not in cart", 404);
      } else {
        const cartItemId = cartItem.id;
        const currentQuantity = cartItem.quantity;
        if (currentQuantity <= quantity) {
          await tx.cartItems.delete({ where: { id: cartItemId } });
        } else {
          await tx.cartItems.update({
            data: { quantity: { decrement: quantity } },
            where: { id: cartItemId },
          });
        }
      }
    }
    const updated = await tx.carts.findUnique({
      where: { userId },
      include: {
        cartItems: {
          include: { products: true },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    return updated;
  });
};

export const clearCart = async (userId: number) => {
  const cart = await prisma.carts.findUnique({ where: { userId } });
  if (!cart) {
    throw new AppError("Cart not found", 404);
  }
  await prisma.cartItems.deleteMany({
    where: {
      carts: {
        userId,
      },
    },
  });
  return cart;
};

export default {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
};
