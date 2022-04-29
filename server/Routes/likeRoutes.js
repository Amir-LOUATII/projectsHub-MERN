const express = require("express");
const { createLike, deleteLike } = require("../controllers/likeControllers");

const router = express.Router();

router.route("/").post(createLike).delete(deleteLike);

module.exports = router;
