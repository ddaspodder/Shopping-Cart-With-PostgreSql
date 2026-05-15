const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
