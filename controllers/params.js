const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");
const userPopulateOptions = {
  path: "createdBy",
  select: "username fullname imageURL",
};

const getPostById = async (req, res, next, id) => {
  try {
    const post = await Post.findById(id);
    if (!post) {
      throw Error("No post Found");
    } else {
      req.post = post;
      next();
    }
  } catch (err) {
    res.status(503).json({ success: false, data: "Something went worng" });
  }
};

const getProfileByUsername = async (req, res, next, username) => {
  try {
    const profile = await User.findOne({ username }, { password: 0, __v: 0 });
    if (!profile) {
      res.status(404).json({ success: false, error: "No user Found" });
    } else {
      req.profile = profile;
      next();
    }
  } catch (err) {
    res.status(503).json({ success: false, error: "something went worng" });
  }
};

const getProfilePosts = async (req, res, next) => {
  try {
    console.log("hi");
    const { profile } = req;
    const posts = await Post.find({ createdBy: profile._id })
      .populate(userPopulateOptions)
      .limit(5)
      .sort({ createdAt: "desc" })
      .lean();
    console.log({ posts });
    req.posts = posts;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(503).json({ success: false, error: "something went worng" });
  }
};

module.exports = { getPostById, getProfileByUsername, getProfilePosts };
