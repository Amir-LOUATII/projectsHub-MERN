const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const validator = require("validator");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      maxlength: 20,
      required: [true, "user must have a name"],
    },
    email: {
      type: String,
      required: [true, "user must have an email"],
      unique: [true, "email already used "],
      validate: {
        validator: validator.isEmail,
        message: "please enter a valid email",
      },
    },
    password: {
      type: String,
      required: [true, "user must have a password"],
    },
    online: {
      type: Boolean,
      default: false,
    },
    numberOfProjects: { type: Number, default: 0 },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    image: {
      type: String,
      default:
        "https://res.cloudinary.com/dvykd3m90/image/upload/v1650246513/projectshub/profile-picture_fidjrv.png",
    },
    job: { type: String, minlength: 3 },
    numberOfFollowers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

UserSchema.pre("save", async function () {
  if (!this.isModified("password")) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (providedPassword) {
  const isMatch = await bcrypt.compare(providedPassword, this.password);
  return isMatch;
};

UserSchema.virtual("projects", {
  ref: "Project",
  localField: "_id",
  foreignField: "createdBy",
  justOne: false,
});

UserSchema.post("remove", async function () {
  const project = this.model("Project").find({ createdBy: this._id });
  project.forEach((project) => {
    project.remove();
  });
});
module.exports = mongoose.model("User", UserSchema);
