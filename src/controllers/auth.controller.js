const { register, signIn } = require("../services/auth.service");
const asyncHandler = require("../utils/asyncHandler");
const { success } = require("../utils/responseHandler");
const { formatUser } = require("../utils/formatters/user.formatter");

const registerController = asyncHandler(async (req, res) => {
  const { user, token } = await register(req.body);
  success(res, { user: formatUser(user), token }, 201);
});

const signInController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { token } = await signIn(email, password);
  success(res, { token }, 200);
});

module.exports = { registerController, signInController };
