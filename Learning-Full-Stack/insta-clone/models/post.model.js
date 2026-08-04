const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  caption: {
    type: String,
    default: "",
  },
  imgUrl: {
    type: String,
    required: [true, "Image is required"],
  },
  user: {
    ref: "users",
    type: mongoose.Schema.Types.ObjectId,
    required: [true, "Post can't be created without user id"],
  },
});

const postModel = mongoose.model("posts", postSchema);

module.exports = postModel;
