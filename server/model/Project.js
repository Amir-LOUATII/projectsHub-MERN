const mongoose = require("mongoose");
const validator = require("validator");

const ProjectSchema = new mongoose.Schema(
  {
    projectName: {
      type: String,
      minlength: 1,
      maxlength: 50,
      required: [true, "project must have a name"],
    },
    siteURL: {
      type: String,
      minlength: 1,
      required: [true, "project must have a site URL"],
      validate: {
        validator: validator.isURL,
        message: "site URL must be an URL",
      },
    },
    repositryURL: {
      type: String,
      minlength: 1,
      required: [true, "project must have a repository URL"],
      validate: {
        validator: validator.isURL,
        message: "site URL must be an URL",
      },
    },

    numberOfLikes: { type: Number, default: 0 },
    numberOfComments: { type: Number, default: 0 },
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    tags: { type: [String] },
    description: String,
    screenShot: { type: String, minlength: 1 },
  },

  { timestamps: true }
);

ProjectSchema.statics.getNumberOfProject = async function (creator) {
  const result = await this.aggregate([
    { $match: { createdBy: creator } },
    { $group: { _id: null, numberOfProjects: { $sum: 1 } } },
  ]);

  try {
    await this.model("User").findOneAndUpdate(
      { _id: creator },
      { numberOfProjects: result[0].numberOfProjects }
    );
  } catch (error) {
    console.log(error);
  }
};
ProjectSchema.post("save", async function () {
  await this.constructor.getNumberOfProject(this.createdBy);
});

ProjectSchema.post("remove", async function () {
  await this.constructor.getNumberOfProject(this.createdBy);
  const likes = await this.model("Like").find({ project: this._id });
  likes.forEach((like) => {
    like.remove();
  });
  const comments = await this.model("Comment").find({ project: this._id });
  comments.forEach((comment) => {
    comment.remove();
  });
});
module.exports = mongoose.model("Project", ProjectSchema);
