import type { UserRow } from "./user.types";

// declare module "express-serve-static-core" {
//   interface Request {
//     user?: UserRow;
//   }
// }

declare global {
  namespace Express {
    interface Request {
      user?: UserRow;
    }
  }
}

type THIS_SHOULD_BREAK = DoesNotExist;

export {};
