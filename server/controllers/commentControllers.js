const Comment = require("../model/Comment");
const CustomAPIError = require("../errors");
const { StatusCodes } = require("http-status-codes");

const createComment = async (req, res) => {
  const { text, project } = req.body;
  const { userId } = req.user;
  if (!project) {
    throw new CustomAPIError.BadRequestError(
      "please choose project to add the comment"
    );
  }
  if (!text) {
    throw new CustomAPIError.BadRequestError("comment can't be empty");
  }

  const comment = await Comment.create({ text, project, createdBy: userId });
  res.status(StatusCodes.CREATED).json({ comment });
};
const editComment = async (req, res) => {
  const { text, project } = req.body;
  const { userId } = req.user;
  const { id } = req.params;
  if (!project) {
    throw new CustomAPIError.BadRequestError(
      "please choose project to edit the comment"
    );
  }
  if (!text) {
    throw new CustomAPIError.BadRequestError("comment can't be empty");
  }

  const comment = await Comment.findById(id);
  if (comment.createdBy.toString() !== userId) {
    throw new CustomAPIError.UnauthorizedError("not authorized");
  }

  comment.text = text;
  comment.save();
  res.status(StatusCodes.OK).json({ comment });
};
const deleteComment = async (req, res) => {
  const { userId } = req.user;
  const { id } = req.params;

  const comment = await Comment.findOne({ _id: id });
  if (comment.createdBy.toString() !== userId && userRole !== "admin") {
    throw new CustomAPIError.UnauthorizedError("not authorized");
  }

  comment.remove();
  res.status(StatusCodes.OK).json({ message: "comment deleted" });
};

module.exports = { deleteComment, createComment, editComment };
