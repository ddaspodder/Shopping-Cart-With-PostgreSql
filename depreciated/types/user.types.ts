export interface CreateUserBody {
  email: string;
  password: string;
}

export interface CreateUserInput extends CreateUserBody {
  role?: string;
}

export interface UserFilters {
  email?: string | { pattern: string };
  role?: string | { pattern: string };
}

export interface UserRow {
  id: number;
  email: string;
  role: string;
}

export interface UserResponse {
  id: string;
  email: string;
  role: string;
}
