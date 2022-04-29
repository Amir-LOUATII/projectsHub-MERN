const jwt = require("jsonwebtoken");
const CustomAPIError = require("../errors");
const authenticateUser = async (req, res, next) => {
  const { token } = req.signedCookies;
  if (token) {
    const user = jwt.decode(token);
    if (user) {
      req.user = user;
      next();
    } else {
      throw new CustomAPIError.UnauthenticatedError("unauthenticated user ");
    }
  } else {
    throw new CustomAPIError.UnauthenticatedError("unauthenticated user ");
  }
};

module.exports = authenticateUser;
