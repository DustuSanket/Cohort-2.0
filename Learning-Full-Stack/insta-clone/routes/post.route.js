const express = require("express");
const { createPost } = require("../controllers/post.controller");

const postRouter = express.Router();

postRouter.post("/", upload.single("file"), createPost);

module.exports = postRouter;
