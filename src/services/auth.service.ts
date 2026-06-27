import AppError from "../utils/appError";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../db/prisma";
import { CreateUserInput } from "../schemas/user.schema";

export const getUserById = async (userId: number) => {
  const user = await prisma.users.findUnique({ where: { id: userId } });
  return user;
};

export const register = async (userData: CreateUserInput) => {
  const { email, password } = userData;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const existingUser = await prisma.users.findUnique({ where: { email } });
  if (existingUser) throw new AppError("Email already exists", 409);

  const user = await prisma.users.create({
    data: { email: email, password: hashedPassword },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? ("1h" as any),
  });
  return { user, token };
};

export const signIn = async (
  email: CreateUserInput["email"],
  password: CreateUserInput["password"],
) => {
  const user = await prisma.users.findUnique({ where: { email } });
  if (!user) throw new AppError("Invalid email or password", 401);
  const hashedPassword = user.password;
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
  if (!isPasswordCorrect) throw new AppError("Invalid email or password", 401);
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
    expiresIn: process.env.JWT_EXPIRES_IN ?? ("1h" as any),
  });
  return { token };
};

export const getUserDetails = async (userId: number) => {
  const user = await prisma.users.findUnique({
    where: { id: userId },
    select: {
      id: true,
      email: true,
      role: true,
    },
  });
  if (!user) throw new AppError("User not found", 404);
  return user;
};
