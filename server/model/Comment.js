const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    text: {
      type: String,
      minlength: 1,
      trim: true,
      required: [true, "comment should'nt be empty"],
    },
    project: { type: mongoose.Types.ObjectId, ref: "Project" },
  },
  { timestamps: true }
);

CommentSchema.statics.getProjectComments = async function (projectId) {
  const result = await this.aggregate([
    { $match: { project: projectId } },
    { $group: { _id: null, numberOfComments: { $sum: 1 } } },
  ]);

  try {
    await this.model("Project").findOneAndUpdate(
      { _id: projectId },
      { numberOfComments: result[0].numberOfComments }
    );
  } catch (error) {
    console.log(error);
  }
};

CommentSchema.post("save", async function () {
  await this.constructor.getProjectComments(this.project);
});
CommentSchema.post("remove", async function () {
  await this.constructor.getProjectComments(this.project);
});
module.exports = mongoose.model("Comment", CommentSchema);
