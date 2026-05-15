const Product = {
  type: "object",
  properties: {
    id: {
      type: "string",
      default: "000000001",
      description: "Unique identifier for the product",
    },
    name: {
      type: "string",
      default: "Laptop",
      description: "Name of the product",
    },
    price: {
      type: "number",
      default: "10000",
      description: "Price of the product",
    },
  },
  required: ["id", "name", "price"],
};

const CreateProduct = {
  type: "object",
  properties: {
    name: {
      type: "string",
      default: "Laptop",
      description: "Name of the product",
    },
    price: {
      type: "number",
      default: "10000",
      description: "Price of the product",
    },
  },
  required: ["name", "price"],
};

module.exports = { Product, CreateProduct };
