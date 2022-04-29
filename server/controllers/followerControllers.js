const { StatusCodes } = require("http-status-codes");
const Follower = require("../model/Follower");
const CustomAPIError = require("../errors");

const createFollower = async (req, res) => {
  const { userId } = req.user;
  const { followeeId } = req.body;

  const follow = await Follower.findOne({
    follower: userId,
    followee: followeeId,
  });
  if (follow) {
    throw new CustomAPIError.BadRequestError("user already followed");
  }
  const newFollow = await Follower.create({
    follower: userId,
    followee: followeeId,
  });
  res.status(StatusCodes.CREATED).json({ message: "followed" });
};

const deleteFollower = async (req, res) => {
  const { userId } = req.user;
  const { followeeId } = req.body;
  const follow = await Follower.findOne({
    follower: userId,
    followee: followeeId,
  });

  if (!follow) {
    throw new CustomAPIError.BadRequestError("user is not followed");
  }
  follow.remove();
  res.status(StatusCodes.OK).json({ message: "unfollowed" });
};

module.exports = { createFollower, deleteFollower };
