const { StatusCodes } = require("http-status-codes");
const Project = require("../model/Project");
const CustomAPIError = require("../errors/index");
const Comment = require("../model/Comment");
const Like = require("../model/Like");
const urlScreenShot = require("../utils/urlScreenShot");

const getAllProjects = async (req, res) => {
  const projects = await Project.find({}).populate({
    path: "createdBy",
    select: "name image job",
  });
  res.status(StatusCodes.OK).json({ projects });
};

const getSingleProject = async (req, res) => {
  const { id } = req.params;
  const project = await Project.findById(id).populate({
    path: "createdBy",
    select: "name image _id",
  });
  if (!project) {
    throw new CustomAPIError.NotFoundError("there is no project with this id");
  }

  res.status(StatusCodes.OK).json({ project });
};

const createProject = async (req, res) => {
  const { projectName, siteURL, repositryURL, tags, description } = req.body;
  const { userId } = req.user;
  if (!projectName) {
    throw new CustomAPIError.BadRequestError("project must have a name");
  }
  if (!siteURL) {
    throw new CustomAPIError.BadRequestError("project must have a site URL");
  }
  if (!repositryURL) {
    throw new CustomAPIError.BadRequestError(
      "project must have a repositry URL"
    );
  }
  if (!tags.length) {
    throw new CustomAPIError.BadRequestError(
      "project must have atleast one tag"
    );
  }

  let newProject = {
    projectName,
    siteURL,
    repositryURL,
    tags,
    description,
    createdBy: userId,
  };

  const project = await Project.create(newProject);
  const screenShot = await urlScreenShot(siteURL, projectName);
  project.screenShot = screenShot;
  project.save();
  res.status(StatusCodes.CREATED).json({ project });
};

const updateProject = async (req, res) => {
  const { projectName, siteURL, repositryURL, tags, description } = req.body;
  const { userId, userRole } = req.user;
  const { id } = req.params;
  if (!projectName) {
    throw new CustomAPIError.BadRequestError("project must have a name");
  }
  if (!siteURL) {
    throw new CustomAPIError.BadRequestError("project must have a site URL");
  }
  if (!repositryURL) {
    throw new CustomAPIError.BadRequestError(
      "project must have a repositry URL"
    );
  }
  if (!tags.length) {
    throw new CustomAPIError.BadRequestError(
      "project must have atleast one tag"
    );
  }
  const project = await Project.findById(id);
  if (userId !== project.createdBy.toString()) {
    throw new CustomAPIError.UnauthorizedError("not authorized");
  }
  project.projectName = projectName;
  project.description = description;
  project.siteURL = siteURL;
  project.repositryURL = repositryURL;
  project.tags = tags;

  await project.save();

  res.status(StatusCodes.OK).json({ project });
};
const deleteProject = async (req, res) => {
  const { userId, userRole } = req.user;
  const { id } = req.params;
  const project = await Project.findById(id);
  if (userRole !== "admin" && userId !== project.createdBy.toString()) {
    throw new CustomAPIError.UnauthorizedError("not authorized");
  }

  await project.remove();
  res.status(StatusCodes.OK).json({ message: "successfully deleted " });
};

const getProjectComments = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);
  if (!project) {
    throw new CustomAPIError.BadRequestError(
      "there is no project with provided id"
    );
  }
  const comments = await Comment.find({ project: id })
    .populate({
      path: "createdBy",
      select: "image name _id",
    })
    .sort("creatdAt");
  res.status(StatusCodes.OK).json({ comments });
};
const getProjectLikes = async (req, res) => {
  const { id } = req.params;

  const project = await Project.findById(id);
  if (!project) {
    throw new CustomAPIError.BadRequestError(
      "there is no project with provided id"
    );
  }
  const likes = await Like.find({ project: id })
    .populate({
      path: "createdBy",
      select: "image name _id",
    })
    .sort("creatdAt");
  res.status(StatusCodes.OK).json({ likes });
};
module.exports = {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
  getProjectComments,
  getProjectLikes,
};
