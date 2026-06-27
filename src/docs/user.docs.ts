import { registry } from "./registry";
import {
  createUserSchema,
  signInUserSchema,
  userResponseSchema,
  createUserResponseSchema,
  signInResponseSchema,
} from "../schemas/user.schema";

import {
  successResponseSchema,
  failureResponseSchema,
} from "../schemas/status.schema";

registry.register("CreateUserInput", createUserSchema);
registry.register("SignInInput", signInUserSchema);
registry.register("UserResponse", userResponseSchema);
registry.register("CreateUserResponse", createUserResponseSchema);
registry.register("SignInResponse", signInResponseSchema);

registry.registerPath({
  method: "get",
  path: "/auth/me",
  operationId: "getCurrentUser",
  description: "Get current user details",
  tags: ["Users"],
  responses: {
    200: {
      description: "Users",
      content: {
        "application/json": {
          schema: successResponseSchema(userResponseSchema),
        },
      },
    },
    404: {
      description: "User not found",
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
  path: "/auth/register",
  operationId: "registerUser",
  description: "Create user",
  tags: ["Users"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: createUserSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "User",
      content: {
        "application/json": {
          schema: successResponseSchema(createUserResponseSchema),
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
  path: "/auth/signin",
  operationId: "signInUser",
  description: "Sign in user",
  tags: ["Users"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: signInUserSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "User",
      content: {
        "application/json": {
          schema: successResponseSchema(signInResponseSchema),
        },
      },
    },
    500: {
      description: "Unauthorized",
      content: {
        "application/json": {
          schema: failureResponseSchema,
        },
      },
    },
  },
});
