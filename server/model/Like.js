const mongoose = require("mongoose");
const LikeSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    project: { type: mongoose.Types.ObjectId, ref: "Project" },
  },
  { timestamps: true }
);

LikeSchema.statics.getProjectLikes = async function (projectId) {
  const result = await this.aggregate([
    { $match: { project: projectId } },
    { $group: { _id: null, numberOfLikes: { $sum: 1 } } },
  ]);
  try {
    await this.model("Project").findOneAndUpdate(
      { _id: projectId },
      { numberOfLikes: result[0].numberOfLikes }
    );
  } catch (error) {
    console.log(error);
  }
};
LikeSchema.post("save", async function () {
  await this.constructor.getProjectLikes(this.project);
});

LikeSchema.post("remove", async function () {
  await this.constructor.getProjectLikes(this.project);
});
module.exports = mongoose.model("Like", LikeSchema);
