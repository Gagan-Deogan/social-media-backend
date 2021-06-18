const { Post } = require("../models/post.model");
const { User } = require("../models/user.model");

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

const getUserDetailsByUsername = async (req, res, next, username) => {
  try {
    const { user } = req;
    let userDetails = await User.findOne({ username }, { password: 0, __v: 0 });
    if (!userDetails) {
      res.status(404).json({ success: false, error: "No user Found" });
    } else {
      req.userDetails = userDetails;
      next();
    }
  } catch (err) {
    res.status(503).json({ success: false, error: "something went worng" });
  }
};

const searchUsersByUsername = async (req, res, next, username) => {
  try {
    const searchString = new RegExp(username, "ig");
    const users = await User.aggregate()
      .project({
        fullname: 1,
        username: 1,
        imageURL: 1,
      })
      .match({ username: searchString });
    req.users = users;
    next();
  } catch (err) {
    console.log(err.message);
    res.status(503).json({ success: false, error: "something went worng" });
  }
};
module.exports = {
  getPostById,
  getUserDetailsByUsername,
  searchUsersByUsername,
};
