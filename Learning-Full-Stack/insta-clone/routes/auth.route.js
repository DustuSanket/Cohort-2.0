const express = require("express");
const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const authRouter = express.Router();

authRouter.post("/register", async (req, res) => {
  const { username, email, password, bio, profileImg } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserAlreadyExists) {
    return res.status(409).json({
      message:
        "User already exists with " + isUserAlreadyExists.username
          ? "username"
          : "email",
    });
  }

  const hash = crypto.createHash("sha256").update(password).digest("hex");

  const user = await userModel.create({
    username,
    email,
    bio,
    profileImg,
    password: hash,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token);
  res.status(201).json({
    message: "User registered successfully",
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImg: user.profileImg,
    },
  });
});

module.exports = authRouter;
