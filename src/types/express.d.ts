import { ProductsQuery } from "../schemas/product.schema";
import { UserResponse } from "../types/user.types";

declare global {
  namespace Express {
    interface Request {
      user?: UserResponse;
      validatedProductQuery: ProductsQuery;
    }
  }
}

export {};
