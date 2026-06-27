import { z } from "../docs/openapi";

export const successResponseSchema = <T extends object>(dataSchema: T) =>
  z.object({
    status: z.literal("success"),
    data: dataSchema,
  });

export const failureResponseSchema = z.object({
  status: z.literal("failure"),
  message: z.string(),
});

export type SuccessResponse<T extends object> = z.infer<
  ReturnType<typeof successResponseSchema<T>>
>;

export type FailureResponse = z.infer<typeof failureResponseSchema>;
