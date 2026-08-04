const express = require("express");
const cookieParser = require("cookie-parser");
const authRouter = require("../routes/auth.route");
const postRouter = require("../routes/post.route");

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/post", postRouter);

module.exports = app;
