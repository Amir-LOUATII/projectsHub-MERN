const jwt = require("jsonwebtoken");

const createJWT = async (user) => {
  const token = jwt.sign(
    {
      userId: user._id,
      userName: user.name,
      userRole: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_LIFETIME }
  );

  return token;
};

module.exports = createJWT;
