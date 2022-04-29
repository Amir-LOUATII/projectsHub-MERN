const { StatusCodes } = require("http-status-codes");
const User = require("../model/User");
const CustomAPIError = require("../errors");
const path = require("path");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const Follower = require("../model/Follower");

const getAllUsers = async (req, res) => {
  const users = await User.find({})
    .sort("numberOfProjects")
    .select("name _id numberOfProjects image job");
  res.status(StatusCodes.OK).json({ users });
};

const getOnlineUsers = async (req, res) => {
  const users = await User.find({ online: true }).select("name _id image");

  res.status(StatusCodes.OK).json({ users });
};

const getSingleUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id)
    .select("-password -_v -email -role -online -updatedAt")
    .populate({ path: "projects" });
  if (!user) {
    throw new CustomAPIError.NotFoundError(
      "there is no user with the provided id"
    );
  }

  res.status(StatusCodes.OK).json({
    user,
  });
};

const uploadProfilePicture = async (req, res) => {
  let userImage = req.files.image;
  if (!req.files) {
    throw new CustomAPIError.BadRequestError("No file uploaded");
  }
  if (!userImage.mimetype.startsWith("image")) {
    throw new CustomAPIError.BadRequestError("selected file must be an image");
  }

  const result = await cloudinary.uploader.upload(
    req.files.image.tempFilePath,
    { use_filename: true, folder: "projectshub" }
  );

  fs.unlinkSync(req.files.image.tempFilePath);
  const { userId } = req.user;
  const user = await User.findById(userId);
  user.image = result.secure_url;
  await user.save();
  res.status(StatusCodes.OK).json({
    name: user.name,
    id: user._id,
    role: user.role,
    online: user.online,
    image: user.image,
    job: user.job,
  });
};

const getUserFollowers = async (req, res) => {
  const { id } = req.params;
  const followers = await Follower.find({ followee: id }).populate({
    path: "follower",
    select: "_id name image",
  });
  res.status(StatusCodes.OK).json({ followers });
};
const getUserFollowing = async (req, res) => {
  const { id } = req.params;
  const following = await Follower.find({ follower: id }).populate({
    path: "followee",
    select: "name image _id",
  });
  res.status(StatusCodes.OK).json({ following });
};
const changePassword = async (req, res) => {
  res.send("changePassword ");
};
module.exports = {
  getAllUsers,
  getSingleUser,
  changePassword,
  uploadProfilePicture,
  getOnlineUsers,
  getUserFollowers,
  getUserFollowing,
};
