const { StatusCodes } = require("http-status-codes");

// next is used by express-async-errors
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  // set default
  const customError = {
    statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
    message: err.message || "Something went wrong try again later.",
  };
  if (err.code && err.code === 11000) {
    customError.message = `Duplicate value entered ${Object.keys(err.keyValue)} field, please choose another value.`;
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "ValidationError") {
    customError.message = Object.values(err.errors)
      .map((e) => e.message)
      .join(" ");
    customError.statusCode = StatusCodes.BAD_REQUEST;
  }
  if (err.name === "CastError") {
    customError.message = `No item found with id: ${err.value}`;
    customError.statusCode = StatusCodes.NOT_FOUND;
  }
  return res
    .status(customError.statusCode)
    .json({ message: customError.message });
};

module.exports = errorHandler;
