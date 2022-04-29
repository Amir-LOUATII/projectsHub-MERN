const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("./CustomAPIError");

class UnauthenticatedError extends CustomAPIError {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
}

module.exports = UnauthenticatedError;
