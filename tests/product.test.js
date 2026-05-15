const request = require("supertest");
const app = require("../src/app");
const Product = require("../src/models/product.model");
const User = require("../src/models/user.model");
const jwt = require("jsonwebtoken");

describe("Product API", () => {
  it("should get all products", async () => {
    await Product.create({
      name: "Test Product",
      price: 10.99,
    });

    const response = await request(app).get("/api/products");
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toEqual("success");
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBe(1);
    expect(response.body.data[0].name).toBe("Test Product");
  });

  it("should create a new product", async () => {
    const admin = await User.create({
      email: "admin@example.com",
      password: "password123",
      role: "admin",
    });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const newProduct = {
      name: "New Product",
      price: 15.99,
    };

    const response = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(newProduct);
    expect(response.statusCode).toBe(201);
    expect(response.body.status).toEqual("success");
    expect(response.body.data.name).toBe("New Product");
    expect(response.body.data.price).toBe(15.99);

    //product should be in database
    const product = await Product.findById(response.body.data.id);
    expect(product.name).toBe("New Product");
    expect(product.price).toBe(15.99);
  });

  it("create product should fail if not admin", async () => {
    const user = await User.create({
      email: "user@example.com",
      password: "password123",
      role: "user",
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const newProduct = {
      name: "New Product",
      price: 15.99,
    };

    const response = await request(app)
      .post("/api/products")
      .set("Authorization", `Bearer ${token}`)
      .send(newProduct);
    expect(response.statusCode).toBe(403);
    expect(response.body.status).toEqual("failure");
  });
});
