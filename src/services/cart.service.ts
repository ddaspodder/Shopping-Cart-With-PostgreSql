import AppError from "../utils/appError";
import Cart from "../models/cart.model";
import pool from "../db/pool";
import Product from "../models/product.model";
import { CartWithItemsRow } from "../types/cart.types";

export const getCart = async (userId: number): Promise<CartWithItemsRow[]> => {
  const cart = await Cart.findCartByUserId(userId);
  if (!cart) {
    throw new AppError("Cart not found", 404);
  }
  await Cart.deleteCartItemsWithInactiveProductsByUserId(userId);
  const cartWithItems = await Cart.findCartItemsByUserId(userId);
  return cartWithItems;
};

export const addToCart = async (
  userId: number,
  productId: number,
  quantity: number,
): Promise<CartWithItemsRow[]> => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const activeProduct = await Product.findOne({
      id: productId,
      isActive: true,
    });

    if (!activeProduct) throw new AppError("product not found", 404);

    const cart = await Cart.findCartByUserId(userId, client);

    if (!cart) {
      const cartId = await Cart.createCart(userId, client);
      await Cart.createCartItem(cartId, productId, quantity, client);
    } else {
      const cartId = cart.id;
      const cartItem = await Cart.findCartItemByIdAndProductId(
        cartId,
        productId,
        client,
      );
      if (!cartItem) {
        await Cart.createCartItem(cartId, productId, quantity, client);
      } else {
        const cartItemId = cartItem.id;
        await Cart.increaseCartItemQuantity(cartItemId, quantity, client);
      }
      await Cart.updateCartTimestamp(cartId, client);
    }

    await client.query("COMMIT");
    const updated = await Cart.findCartItemsByUserId(userId, client);
    return updated;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const removeFromCart = async (
  userId: number,
  productId: number,
  quantity: number,
): Promise<CartWithItemsRow[]> => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    const activeProduct = await Product.findOne(
      {
        id: productId,
        isActive: true,
      },
      client,
    );
    if (!activeProduct) throw new AppError("product not found", 404);

    const cart = await Cart.findCartByUserId(userId, client);

    if (!cart) {
      throw new AppError("Cart not found", 404);
    } else {
      const cartId = cart.id;
      const cartItem = await Cart.findCartItemByIdAndProductId(
        cartId,
        productId,
        client,
      );
      if (!cartItem) {
        throw new AppError("Product not in cart", 404);
      } else {
        const cartItemId = cartItem.id;
        const currentQuantity = cartItem.quantity;
        if (currentQuantity <= quantity) {
          await Cart.deleteCartItem(cartItemId, client);
        } else {
          await Cart.decreaseCartItemQuantity(cartItemId, quantity, client);
        }
        await Cart.updateCartTimestamp(cartId, client);
      }
    }

    await client.query("COMMIT");
    const updated = await Cart.findCartItemsByUserId(userId, client);
    return updated;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

export const clearCart = async (userId: number): Promise<null> => {
  const cart = await Cart.findCartByUserId(userId);
  if (!cart) {
    throw new AppError("Cart not found", 404);
  }
  await Cart.deleteCartItemsByUserId(userId);
  return null;
};

export default {
  getCart,
  addToCart,
  removeFromCart,
  clearCart,
};
