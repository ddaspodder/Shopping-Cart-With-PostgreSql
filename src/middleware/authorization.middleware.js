const { ROLE } = require("../constants/role.constansts");
const AppError = require("../utils/appError");

const authorizeRoles = (roles) => (req, res, next) => {
  const user = req.user;
  if (!roles.includes(user.role))
    return next(new AppError("Permission denied", 403));
  next();
};

const adminGuard = authorizeRoles([ROLE.ADMIN]);

module.exports = {
  authorizeRoles,
  adminGuard,
};
