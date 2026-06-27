import { registry } from "./registry";
import { cartResponseSchema, updateCartSchema } from "../schemas/cart.schema";
import {
  failureResponseSchema,
  successResponseSchema,
} from "../schemas/status.schema";

registry.register("UpdateCartInput", updateCartSchema);
registry.register("CartResponse", cartResponseSchema);

registry.registerPath({
  method: "get",
  path: "/cart",
  operationId: "getCart",
  description: "Get the current user's cart",
  tags: ["Cart"],
  responses: {
    200: {
      description: "Cart",
      content: {
        "application/json": {
          schema: successResponseSchema(cartResponseSchema),
        },
      },
    },
    404: {
      description: "Cart not found",
      content: {
        "application/json": {
          schema: failureResponseSchema,
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: failureResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/cart/add",
  operationId: "addToCart",
  description: "Add a product to the cart",
  tags: ["Cart"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: updateCartSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Updated cart",
      content: {
        "application/json": {
          schema: successResponseSchema(cartResponseSchema),
        },
      },
    },
    404: {
      description: "Product not found",
      content: {
        "application/json": {
          schema: failureResponseSchema,
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: failureResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/cart/remove",
  operationId: "removeFromCart",
  description: "Remove a product from the cart",
  tags: ["Cart"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: updateCartSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Updated cart",
      content: {
        "application/json": {
          schema: successResponseSchema(cartResponseSchema),
        },
      },
    },
    404: {
      description: "Product or cart not found",
      content: {
        "application/json": {
          schema: failureResponseSchema,
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: failureResponseSchema,
        },
      },
    },
  },
});

registry.registerPath({
  method: "post",
  path: "/cart/clear",
  operationId: "clearCart",
  description: "Clear the current user's cart",
  tags: ["Cart"],
  responses: {
    200: {
      description: "Cleared cart",
      content: {
        "application/json": {
          schema: successResponseSchema(cartResponseSchema),
        },
      },
    },
    404: {
      description: "Cart not found",
      content: {
        "application/json": {
          schema: failureResponseSchema,
        },
      },
    },
    500: {
      description: "Internal Server Error",
      content: {
        "application/json": {
          schema: failureResponseSchema,
        },
      },
    },
  },
});
