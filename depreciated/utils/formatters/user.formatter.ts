import { UserResponse, UserRow } from "../../types/user.types";

export const formatUser = (user: UserRow): UserResponse => {
  return {
    id: user.id.toString(),
    email: user.email,
    role: user.role,
  };
};
