import { ProductsQuery } from "../schemas/product.schema";
import type { CreateUserInput } from "../schemas/user.schema";

declare global {
  namespace Express {
    interface Request {
      user?: CreateUserInput;
      validatedProductQuery: ProductsQuery;
    }
  }
}

export {};
