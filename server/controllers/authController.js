const { StatusCodes } = require("http-status-codes");
const CustomAPIError = require("../errors");
const User = require("../model/User");
const createJWT = require("../utils/jwt");

const register = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  // check if the user already exist
  if (user) {
    throw new CustomAPIError.BadRequestError("this email is already used ");
  }
  // create a new user
  const newUser = await User.create(req.body);

  // first user will be admin
  const users = await User.find({});
  if (users.length <= 1) {
    newUser.role = "admin";
    await newUser.save();
  }

  // update online status
  newUser.online = true;
  await newUser.save();

  // create json web token
  const token = await createJWT(newUser);

  // send json web token using cookie
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: true,
    signed: true,
  });

  // sending response
  res.status(StatusCodes.CREATED).json({
    user: {
      name: newUser.name,
      id: newUser._id,
      role: newUser.role,
      online: newUser.online,
      image: newUser.image,
      job: newUser.job,
      numberOfProjects: newUser.numberOfProjects,
      numberOfFollpwers: newUser.numberOfFollowers,
      following: newUser.following,
    },
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  // check the email and password
  if (!email || !password) {
    throw new CustomAPIError.BadRequestError(
      "please provid email and password"
    );
  }
  const user = await User.findOne({ email });
  if (!user) {
    throw new CustomAPIError.UnauthenticatedError("invalid credentials");
  }

  // checking password validity
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new CustomAPIError.UnauthenticatedError("invalid password");
  }

  // update online status
  user.online = true;
  await user.save();

  // create JWT
  const token = await createJWT(user);

  // sending cookie
  const oneDay = 1000 * 60 * 60 * 24;
  res.cookie("token", token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    signed: true,
  });

  // sending response
  res.status(StatusCodes.OK).json({
    user: {
      name: user.name,
      id: user._id,
      role: user.role,
      online: user.online,
      image: user.image,
      job: user.job,
      numberOfProjects: user.numberOfProjects,
      numberOfFollowers: user.numberOfFollowers,
      following: user.following,
    },
  });
};

const logout = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId);
  user.online = false;
  await user.save();
  res.cookie("token", null, {
    httpOnly: true,
    signed: true,
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });

  res.status(StatusCodes.OK).json({ message: "user logged out" });
};

module.exports = { register, login, logout };
