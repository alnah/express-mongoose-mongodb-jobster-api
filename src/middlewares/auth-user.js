const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { UnauthenticatedError } = require("../errors");

const authUserMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid.");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId).select("-password");
    req.user = user;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid.");
  }
};

module.exports = authUserMiddleware;
