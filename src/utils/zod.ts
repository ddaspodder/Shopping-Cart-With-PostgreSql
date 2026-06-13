import { ZodError } from "zod";

export const getZodErrorMessage = (error: ZodError): string => {
  const issue = error.issues[0];

  if (!issue) {
    return "Invalid request";
  }

  const field = issue.path.join(".");

  return field ? `${field}: ${issue.message}` : issue.message;
};
