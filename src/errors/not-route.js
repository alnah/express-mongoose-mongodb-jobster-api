const { StatusCodes } = require("http-status-codes");

const CustomApiError = require("./custom-api");

class NotRouteError extends CustomApiError {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotRouteError;
