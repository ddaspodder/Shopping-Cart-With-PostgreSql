const request = require("supertest");
const app = require("../src/app");
const jwt = require("jsonwebtoken");
const User = require("../src/models/user.model");
const Cart = require("../src/models/cart.model");
const Product = require("../src/models/product.model");

describe("Order API", () => {
  let token;
  let userId;

  beforeEach(async () => {
    // Create a test user and generate a JWT token
    const user = await User.create({
      email: "user1@example.com",
      password: "password123",
      role: "user",
    });
    token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    userId = user._id;
  });

  it("should get all orders for the user", async () => {
    console.log("token", token, userId);
    const response = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toEqual("success");
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should create a new order", async () => {
    //create Product
    const product = new Product({
      name: "Test Product",
      price: 10.99,
      isActive: true,
    });
    await product.save();

    // Create a cart for the user
    const cart = new Cart({
      userId,
      items: [
        {
          productId: product._id, // Use the ID of the created product
          quantity: 2,
        },
      ],
    });
    await cart.save();
    expect(token).not.toBeUndefined();

    const response = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toEqual("success");
    expect(response.body.data).toHaveProperty("id");
    expect(response.body.data.items.length).toBe(1);
    expect(response.body.data.totalAmount).toBe(21.98);

    // Verify that the cart is cleared after order creation
    const updatedCart = await Cart.findOne({ userId });
    const isCartEmpty = !updatedCart || updatedCart.items.length === 0;
    expect(isCartEmpty).toBe(true);
  });
});
