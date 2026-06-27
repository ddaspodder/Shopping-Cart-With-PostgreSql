import { z } from "../docs/openapi";

export const createUserSchema = z.object({
  email: z.email({
    error: (issue) =>
      issue.input === undefined ? "Email is required" : "Invalid email format",
  }),
  password: z
    .string({
      error: (issue) =>
        issue.input === undefined
          ? "Password is required"
          : "Password must be a string",
    })
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
      "Password must contain at least one letter and one number and be at least 6 characters long",
    ),
});

export const signInUserSchema = createUserSchema;

export const userResponseSchema = z.object({
  id: z.number(),
  email: z.string(),
  role: z.string(),
});

export const tokenResponseSchema = z.string();

export const createUserResponseSchema = z.object({
  user: userResponseSchema,
  token: tokenResponseSchema,
});

export const signInResponseSchema = z.object({
  token: tokenResponseSchema,
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
export type SignInInput = z.infer<typeof signInUserSchema>;
export type UserResponse = z.infer<typeof userResponseSchema>;
export type CreateUserResponse = z.infer<typeof createUserResponseSchema>;
export type SignInResponse = z.infer<typeof signInResponseSchema>;
