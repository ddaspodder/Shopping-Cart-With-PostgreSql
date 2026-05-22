const AppError = require("../utils/appError");
const Cart = require("../models/cart.model");
const pool = require("../db/pool");
const Product = require("../models/product.model");

const getCart = async (userId) => {
  const cart = await Cart.getCartItemsWithActiveProduct(userId);
  if (!cart || cart.length == 0) {
    await Cart.clearCart(userId);
    throw new AppError("Cart not found", 404);
  }
  return cart;
};

const addToCart = async (userId, productId, quantity) => {
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
      const cartId = await Cart.create(userId, client);
      await Cart.createCartItem(cartId, productId, quantity, client);
    } else {
      const cartId = cart.id;
      const cartItem = await Cart.findCartItem(cartId, productId, client);
      if (!cartItem) {
        await Cart.createCartItem(cartId, productId, quantity, client);
      } else {
        const cartItemId = cartItem.id;
        await Cart.increaseCartItemQuantity(cartItemId, quantity, client);
      }
    }

    await client.query("COMMIT");
    const updated = await Cart.getCartItemsWithActiveProduct(userId, client);
    return updated;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const removeFromCart = async (userId, productId, quantity) => {
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
      const cartItem = await Cart.findCartItem(cartId, productId, client);
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
      }
    }

    await client.query("COMMIT");
    const updated = await Cart.getCartItemsWithActiveProduct(userId, client);
    return updated;
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    client.release();
  }
};

const clearCart = async (userId) => {
  const cart = await Cart.findCartByUserId(userId);
  if (!cart) {
    throw new AppError("Cart not found", 404);
  }
  await Cart.clearCart(userId);
  return null;
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
