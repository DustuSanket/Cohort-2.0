const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username required"],
    unique: [true, "Username already exists"],
  },

  email: {
    type: String,
    required: [true, "Email required"],
    unique: [true, "Account already exists with this email"],
  },

  password: {
    type: String,
    required: [true, "Enter a password"],
  },

  bio: String,

  profileImg: {
    type: String,
    default: "https://ik.imagekit.io/sanketxd/download.webp",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
