const Like = require("../model/Like");
const Project = require("../model/Project");
const CustomAPIError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const createLike = async (req, res) => {
  const { userId } = req.user;
  const project = await Project.findById(req.body.project);
  if (!project) {
    throw new CustomAPIError.NotFoundError(
      "there is no such project with provided id"
    );
  }
  const like = await Like.findOne({
    project: req.body.project,
    createdBy: userId,
  });

  if (like) {
    throw new CustomAPIError.BadRequestError("project alreay liked");
  }
  const newLike = await Like.create({
    project: req.body.project,
    createdBy: userId,
  });
  res.status(StatusCodes.CREATED).json({ newLike });
};
const deleteLike = async (req, res) => {
  const { userId } = req.user;
  const project = await Project.findById(req.body.project);
  if (!project) {
    throw new CustomAPIError.NotFoundError(
      "there is no such project with provided id"
    );
  }
  const like = await Like.findOne({
    project: req.body.project,
    createdBy: userId,
  });

  await like.remove();
  res.status(StatusCodes.OK).json({ message: "like removed " });
};

module.exports = { createLike, deleteLike };
