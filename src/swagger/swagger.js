const swaggerJSDoc = require("swagger-jsdoc");
const productSchema = require("./schemas/product.schema");
const responseSchema = require("./schemas/response.schema");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shopping Cart API",
      version: "1.0.0",
      description: "API documentation for Shopping Cart API",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      responses: {
        ...responseSchema,
      },
      schemas: {
        ...productSchema,
      },
    },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
