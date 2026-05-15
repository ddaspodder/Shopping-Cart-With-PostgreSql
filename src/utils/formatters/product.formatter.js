const productFormatter = (product) => {
  return {
    id: product._id.toString(),
    name: product.name,
    price: product.price,
  };
};

const productListFormatter = (products) => {
  return products.map(productFormatter);
};

module.exports = { productFormatter, productListFormatter };
