const express = require("express");
const multer = require("multer");
const { createPost } = require("../controllers/post.controller");
const upload = multer({ storage: multer.memoryStorage() });

const postRouter = express.Router();

postRouter.post("/", upload.single("file"), createPost);

module.exports = postRouter;
