import { Prisma } from "@prisma/client";

export function getPrismaErrorResponse(
  err: Prisma.PrismaClientKnownRequestError | unknown,
) {
  if (!err || !(err instanceof Prisma.PrismaClientKnownRequestError))
    return null;

  switch (err.code) {
    case "P2002":
      return {
        message: "Duplicate value",
        statusCode: 409,
      };
    case "P2003":
      return {
        message: "Related resource does not exist",
        statusCode: 404,
      };
    case "P2025":
      return {
        message: "Resource not found",
        statusCode: 404,
      };
    default:
      return null;
  }
}
