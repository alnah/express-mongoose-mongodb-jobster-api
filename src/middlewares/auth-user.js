const jwt = require("jsonwebtoken");

const User = require("../models/user");
const { UnauthenticatedError } = require("../errors");

const authUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Authentication invalid.");
  }
  const token = authHeader.split(" ")[1];
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(payload.userId).select("-password");
    const testUser = payload.userId === "669f3e49d5f495305bb331eb";
    req.user = user;
    req.testUser = testUser;
    next();
  } catch (error) {
    throw new UnauthenticatedError("Authentication invalid.");
  }
};

module.exports = authUser;
