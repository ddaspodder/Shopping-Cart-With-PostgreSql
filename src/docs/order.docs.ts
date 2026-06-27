import { z } from "./openapi";
import { registry } from "./registry";
import {
  orderParamsSchema,
  orderResponseSchema,
  updateOrderStatusSchema,
} from "../schemas/order.schema";
import {
  failureResponseSchema,
  successResponseSchema,
} from "../schemas/status.schema";

registry.register("OrderParams", orderParamsSchema);
registry.register("UpdateOrderStatusInput", updateOrderStatusSchema);
registry.register("OrderResponse", orderResponseSchema);

registry.registerPath({
  method: "get",
  path: "/orders",
  operationId: "getOrders",
  description: "Get all orders for the current user",
  tags: ["Orders"],
  responses: {
    200: {
      description: "Orders",
      content: {
        "application/json": {
          schema: successResponseSchema(z.array(orderResponseSchema)),
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
  path: "/orders",
  operationId: "createOrder",
  description: "Create an order from the current cart",
  tags: ["Orders"],
  responses: {
    201: {
      description: "Order created",
      content: {
        "application/json": {
          schema: successResponseSchema(orderResponseSchema),
        },
      },
    },
    400: {
      description: "Cart is empty or invalid",
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
  method: "get",
  path: "/orders/{id}",
  operationId: "getOrderById",
  description: "Get order by id",
  tags: ["Orders"],
  request: {
    params: orderParamsSchema,
  },
  responses: {
    200: {
      description: "Order",
      content: {
        "application/json": {
          schema: successResponseSchema(orderResponseSchema),
        },
      },
    },
    404: {
      description: "Order not found",
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
  method: "patch",
  path: "/orders/{id}/status",
  operationId: "updateOrderStatus",
  description: "Update an order status",
  tags: ["Orders"],
  request: {
    params: orderParamsSchema,
    body: {
      content: {
        "application/json": {
          schema: updateOrderStatusSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Updated order",
      content: {
        "application/json": {
          schema: successResponseSchema(orderResponseSchema),
        },
      },
    },
    404: {
      description: "Order not found",
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
