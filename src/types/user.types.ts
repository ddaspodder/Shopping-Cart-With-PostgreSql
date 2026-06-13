export interface UserResponse {
  id: number;
  email: string;
  role: "user" | "admin";
}
