import User from "../models/user.model";
import AppError from "../utils/appError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CreateUserBody } from "../types/user.types";
import { DatabaseError } from "pg";

export const register = async (userData: CreateUserBody) => {
  const { password } = userData;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await User.create({ ...userData, password: hashedPassword });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "1h" as any,
    });
    return { user, token };
  } catch (err) {
    if (err instanceof DatabaseError && err.code === "23505") {
      //db error on duplicate entry
      throw new AppError("Email already exists", 409);
    }
    throw err;
  }
};

export const signIn = async (
  email: CreateUserBody["email"],
  password: CreateUserBody["password"],
) => {
  const user = await User.findOne({ email });
  if (!user) throw new AppError("invalid email or password", 401);
  const hashedPassword = user.password;
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
  if (!isPasswordCorrect) throw new AppError("invalid email or password", 401);
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: "1h" as any,
  });
  return { token };
};
