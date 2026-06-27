import { registry } from "./registry";
import { OpenApiGeneratorV31 } from "@asteasolutions/zod-to-openapi";

import "./product.docs";
import "./user.docs";
import "./cart.docs";
import "./order.docs";

const generator = new OpenApiGeneratorV31(registry.definitions);

export const openApiDocument = generator.generateDocument({
  openapi: "3.1.0",
  info: {
    title: "Shopping Cart API",
    version: "1.0.0",
  },
});
