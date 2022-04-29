const mongoose = require("mongoose");

const FollowerSchema = mongoose.Schema(
  {
    follower: { type: mongoose.Types.ObjectId, ref: "User" },
    followee: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

FollowerSchema.statics.updateUserFollower = async function (userId) {
  const result = await this.aggregate([
    { $match: { followee: userId } },
    { $group: { _id: null, numberOfFollowers: { $sum: 1 } } },
  ]);
  console.log(userId);
  try {
    await this.model("User").findByIdAndUpdate(userId, {
      numberOfFollowers: result[0].numberOfFollowers,
    });
  } catch (error) {
    console.log(error);
  }
};
FollowerSchema.statics.updateUserFollowing = async function (userId) {
  const result = await this.aggregate([
    { $match: { follower: userId } },
    { $group: { _id: null, following: { $sum: 1 } } },
  ]);
  try {
    await this.model("User").findByIdAndUpdate(userId, {
      following: result[0].following,
    });
  } catch (error) {
    console.log(error);
  }
};
FollowerSchema.post("save", async function () {
  console.log(this.follower);
  await this.constructor.updateUserFollower(this.followee);
  await this.constructor.updateUserFollowing(this.follower);
});
FollowerSchema.post("remove", async function () {
  await this.constructor.updateUserFollower(this.followee);
  await this.constructor.updateUserFollowing(this.follower);
});
module.exports = mongoose.model("Follower", FollowerSchema);
