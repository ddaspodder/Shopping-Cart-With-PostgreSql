const User = require("../models/user.model");
const AppError = require("../utils/appError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (userData) => {
  const { password } = userData;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  try {
    const user = await User.create({ ...userData, password: hashedPassword });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return { user, token };
  } catch (err) {
    if (err.code === 11000) {
      //db error on duplicate entry
      throw new AppError("Email already exists", 409);
    }
    throw err;
  }
};

const signIn = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new AppError("invalid email or password", 401);
  const hashedPassword = user.password;
  const isPasswordCorrect = await bcrypt.compare(password, hashedPassword);
  if (!isPasswordCorrect) throw new AppError("invalid email or password", 401);
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return { token };
};

module.exports = { register, signIn };
