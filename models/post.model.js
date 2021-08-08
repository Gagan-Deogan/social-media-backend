const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const user = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "User required for like",
  },
});

const PostSchema = new Schema(
  {
    imageURL: {
      type: String,
    },
    title: {
      type: String,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: "User required for Creating",
    },
    likes: {
      type: Number,
    },
    likesBy: [user],
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = { Post };
