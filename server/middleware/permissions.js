const CustomAPIError = require("../errors");

const permissionMiddileware = (...role) => {
  return async (req, res, next) => {
    if (role.includes(req.user.userRole)) {
      next();
    } else {
      throw new CustomAPIError.UnauthenticatedError(
        "unauthorized to reach this route"
      );
    }
  };
};

module.exports = permissionMiddileware;
