const AppError = require("../utils/appError");
const Cart = require("../models/cart.model");
const { getActiveProductById } = require("./product.service");

const getCart = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart || cart.items.length === 0)
    throw new AppError("Cart not found", 404);

  const activeItems = (
    await Promise.all(
      cart.items.map(async (item) => {
        try {
          await getActiveProductById(item.productId);
          return item;
        } catch (err) {
          if (err instanceof AppError && err.statusCode === 404) {
            return null;
          }
        }
      }),
    )
  ).filter((item) => Boolean(item));

  if (activeItems.length === 0) {
    await Cart.deleteOne({ userId });
    throw new AppError("Cart not found", 404);
  }

  cart.items = activeItems;

  await cart.save();

  return cart;
};

const addToCart = async (userId, productId, quantity) => {
  await getActiveProductById(productId);

  const cart = await Cart.findOne({ userId });

  if (!cart) {
    const newCart = new Cart({
      userId,
      items: [{ productId, quantity }],
    });
    await newCart.save();
    return newCart;
  }

  const cartItem = cart.items.find(
    (cartItem) => cartItem.productId.toString() === productId,
  );

  if (!cartItem) {
    cart.items.push({ productId, quantity });
  } else {
    cartItem.quantity += quantity;
  }

  await cart.save();
  return cart;
};

const removeFromCart = async (userId, productId, quantity) => {
  await getActiveProductById(productId);

  const cart = await Cart.findOne({ userId });
  if (!cart) throw new AppError("Item no longer exist", 404);

  const cartItem = await cart.items.find(
    (cartItem) => cartItem.productId.toString() === productId,
  );

  if (!cartItem) throw new AppError("Item no longer exist", 404);

  if (cartItem.quantity <= quantity) {
    const cartItemIndex = cart.items.findIndex(
      (item) => item.productId === productId,
    );
    cart.items.splice(cartItemIndex, 1);
  } else {
    cartItem.quantity -= quantity;
  }

  await cart.save();

  return cart;
};

const clearCart = async (userId) => {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new AppError("Cart not found", 404);
  cart.items = [];
  await cart.save();
  return cart;
};

module.exports = { getCart, addToCart, removeFromCart, clearCart };
