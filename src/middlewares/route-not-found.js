const { StatusCodes } = require("http-status-codes");

const routeNotFoundMiddleware = (_, res) => {
  res.status(StatusCodes.NOT_FOUND).json({ message: "Route not found." });
};

module.exports = routeNotFoundMiddleware;
