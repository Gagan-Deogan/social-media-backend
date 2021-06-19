const { Post } = require("../models/post.model");
const { Notification } = require("../models/notification.model");
const { getLikedByCurrentUserFlag } = require("../utils/profile.utils");
const { isUserLikeThePost } = require("../utils/post.utils");
const { saveLikeNotfication } = require("../utils/notification.utils");
const { concat, extend } = require("lodash");

const userPopulateOptions = {
  path: "createdBy",
  select: "username fullname imageURL",
};

const getPosts = async (req, res) => {
  try {
    const { user } = req;
    let posts = await Post.find()
      .populate(userPopulateOptions)
      .limit(5)
      .sort({ createdAt: "desc" })
      .lean();
    if (!posts) {
      return res.status(200).json({ success: true, data: [] });
    }
    posts = getLikedByCurrentUserFlag(posts, user);
    res.status(200).json({ success: true, data: posts });
  } catch (err) {
    console.log(err.message);
    res.status(503).json({ success: false, data: "Something went worng" });
  }
};

const createPost = async (req, res) => {
  try {
    const { user } = req;
    const { title, imageURL } = req.body;
    let NewPost = new Post({ title, imageURL, createdBy: user._id, likes: 0 });
    NewPost = await NewPost.save();
    NewPost = await NewPost.populate(userPopulateOptions).execPopulate();
    res.status(201).json({ success: true, data: NewPost });
  } catch (err) {
    res.status(503).json({ success: false, data: "Something went worng" });
  }
};

const likePost = async (req, res) => {
  try {
    let { post, user } = req;
    let message = "";
    if (isUserLikeThePost(post, user)) {
      post.likes--;
      post.likesBy.id(user._id).remove();
      message = "Post disliked";
    } else {
      post.likes++;
      const updatedLikesBy = concat(post.likesBy, [
        { _id: user._id, user: user._id },
      ]);
      post.likesBy = extend(post.likesBy, updatedLikesBy);
      message = "Post liked";
      saveLikeNotfication(user._id, post.createdBy._id, post._id);
    }
    await post.save();
    res.status(200).json({ success: true, data: message });
  } catch (err) {
    console.log(err);
    res.status(503).json({ success: false, data: "Something went worng" });
  }
};

module.exports = { createPost, getPosts, likePost };
