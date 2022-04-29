const express = require("express");
const {
  createFollower,
  deleteFollower,
} = require("../controllers/followerControllers");
const router = express.Router();

router.route("/").post(createFollower);
router.route("/unfollow").delete(deleteFollower);
module.exports = router;
