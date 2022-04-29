const express = require("express");
const {
  getAllUsers,
  getSingleUser,
  changePassword,
  uploadProfilePicture,
  getOnlineUsers,
  getUserFollowers,
  getUserFollowing,
} = require("../controllers/userControllers");
const authenticateUser = require("../middleware/authentication");
const permissionMiddileware = require("../middleware/permissions");
const router = express.Router();

router.route("/").get(authenticateUser, getAllUsers);

router.route("/changePassword").post(authenticateUser, changePassword);

router.route("/online").get(authenticateUser, getOnlineUsers);

router.route("/uploadProfile").post(authenticateUser, uploadProfilePicture);
router
  .route("/:id")
  .get(authenticateUser, permissionMiddileware("admin", "user"), getSingleUser);

router.route("/:id/followers").get(getUserFollowers);
router.route("/:id/following").get(getUserFollowing);
module.exports = router;
