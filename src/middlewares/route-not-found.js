const { StatusCodes } = require("http-status-codes");

const routeNotFound = (_, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "Route not found." });
};

module.exports = routeNotFound;
