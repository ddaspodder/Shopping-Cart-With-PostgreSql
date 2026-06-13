import { z } from "zod";

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

export type CreateUserInput = z.infer<typeof createUserSchema>;
