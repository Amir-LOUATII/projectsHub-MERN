require("dotenv").config();
require("express-async-errors");

// express
const express = require("express");
const app = express();

const path = require("path");

const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileupload = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
  secure: true,
});

const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const limit = require("express-rate-limit");

// connect db
const connectDB = require("./db/connect");

// routes
const authRouter = require("./Routes/authRoutes");
const userRouter = require("./Routes/userRoutes");
const projectRouter = require("./Routes/projectRoutes");
const commentRouter = require("./Routes/commentRoutes");
const likeRouter = require("./Routes/likeRoutes");
const followerRouter = require("./Routes/followerRouters");

// middleware
const notFoundMiddleware = require("./middleware/notFound");
const errorHandlerMiddleware = require("./middleware/errorHandlerMiddleware");
const authenticateUser = require("./middleware/authentication");

app.use(express.json());
app.set("trust proxy", 1);
app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      "img-src": ["'self'", "https: data:"],
    },
  })
);
app.use(cors());
app.use(xss());
app.use(
  limit({
    windowMs: 1000 * 60 * 15,
    max: 1000,
    message: " reached the number of allowed request",
  })
);
app.use(express.static(path.resolve(__dirname, "./client/build")));
app.use(cookieParser(process.env.JWT_SECRET));
app.use(fileupload({ useTempFiles: true }));

if (process.env.NODE_ENV !== "production") {
  app.use(morgan());
}

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/projects", projectRouter);
app.use("/api/v1/comments", authenticateUser, commentRouter);
app.use("/api/v1/likes", authenticateUser, likeRouter);
app.use("/api/v1/followers", authenticateUser, followerRouter);

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
});
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// start server and connect db
const port = process.env.PORT || 5000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, () => console.log(`server is listenning on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start();
