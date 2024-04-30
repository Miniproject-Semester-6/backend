const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const User = require("../../models/user");
const UserOrganization = require("../../models/userOrganization");
const AppError = require("../../utils/appError");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];
    if (!token)
      return next(new AppError("Please login to access this route", 401));

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id);
    if (!user) return next(new AppError("User does not exist", 401));

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

const authorize = async (req, res, next) => {
  if (req.user.role !== "SUPER_ADMIN")
    return next(
      new AppError("You are not authorized to access this route", 403),
    );

  next();
};

module.exports = { protect, authorize };
