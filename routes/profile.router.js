const express = require("express");
const router = express.Router();
const { getUserDetailsByUsername } = require("../controllers/params");
const {
  sendData,
  ToogleUserFollowTo,
  getUserFollowers,
  getUserFollowing,
} = require("../controllers/profile.controller");
const { authenticate } = require("../config/passport");
const {
  getUserToFollow,
  getProfilePosts,
  updateProfile,
} = require("../middleware/profile.middlware");

router.use(authenticate);
router.param("username", getUserDetailsByUsername);
router.get("/:username", getProfilePosts, sendData);
router.put("/follow", getUserToFollow, ToogleUserFollowTo);
router.put("/edit-profile", updateProfile, getProfilePosts, sendData);

module.exports = router;
