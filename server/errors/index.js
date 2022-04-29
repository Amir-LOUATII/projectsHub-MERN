const CustomAPIError = require("./CustomAPIError");
const BadRequestError = require("./BadRequest");
const NotFoundError = require("./Notfound");
const UnauthenticatedError = require("./unauthenticated");
const UnauthorizedError = require("./unauthorized");

module.exports = {
  CustomAPIError,
  BadRequestError,
  NotFoundError,
  UnauthenticatedError,
  UnauthorizedError,
};
