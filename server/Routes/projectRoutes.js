const express = require("express");
const {
  createProject,
  getAllProjects,
  getSingleProject,
  updateProject,
  deleteProject,
  getProjectComments,
  getProjectLikes,
} = require("../controllers/projectControllers");
const authenticateUser = require("../middleware/authentication");
const router = express.Router();

router.route("/").post(authenticateUser, createProject).get(getAllProjects);
router
  .route("/:id")
  .get(authenticateUser, getSingleProject)
  .patch(authenticateUser, updateProject)
  .delete(authenticateUser, deleteProject);

router.route("/:id/comments").get(authenticateUser, getProjectComments);
router.route("/:id/likes").get(authenticateUser, getProjectLikes);
module.exports = router;
