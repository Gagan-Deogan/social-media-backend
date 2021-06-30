const { User } = require("../models/user.model");
const { Post } = require("../models/post.model");

const userPopulateOptions = {
  path: "createdBy",
  select: "username fullname imageURL",
};

const getProfilePosts = async (req, res, next) => {
  try {
    const { userDetails } = req;
    const posts = await Post.find({ createdBy: userDetails._id })
      .populate(userPopulateOptions)
      .limit(5)
      .sort({ createdAt: "desc" })
      .lean();
    req.posts = posts;
    next();
  } catch (err) {
    console.log(err);
    res.status(503).json({ success: false, error: "something went worng" });
  }
};

const getUserToFollow = async (req, res, next) => {
  try {
    const { username } = req.body;
    const followTo = await User.findOne({ username });
    if (!followTo) {
      throw Error("no user found");
    }
    req.followTo = followTo;
    next();
  } catch (err) {
    res.status(503).json({ success: true, error: "Something went worng" });
  }
};
const updateProfile = async (req, res, next) => {
  try {
    let { user } = req;
    const { newFullname, newBio, newImageUrl, newHeaderImageUrl } = req.body;
    user.fullname = newFullname;
    user.bio = newBio;
    user.imageURL = newImageUrl;
    user.headerImageURL = newHeaderImageUrl;
    const updatedUser = await user.save();
    req.userDetails = updatedUser;
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, error: "something went wrong" });
  }
};

module.exports = {
  getUserToFollow,
  getProfilePosts,
  updateProfile,
};
