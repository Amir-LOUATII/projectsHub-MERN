const express = require("express");
const {
  createComment,
  editComment,
  deleteComment,
} = require("../controllers/commentControllers");
const router = express.Router();

router.route("/").post(createComment);
router.route("/:id").patch(editComment).delete(deleteComment);

module.exports = router;
