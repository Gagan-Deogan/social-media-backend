const { concat, extend } = require("lodash");
const { saveFollowNotification } = require("../utils/notification.utils");
const {
  getLikedByCurrentUserFlag,
  getIsFollowFlagAndExtractFollowersAndFollowing,
} = require("../utils/profile.utils");

const sendData = async (req, res) => {
  try {
    let { userDetails, posts, user } = req;
    userDetails = getIsFollowFlagAndExtractFollowersAndFollowing(
      userDetails,
      user
    );
    posts = getLikedByCurrentUserFlag(posts, user);
    res.status(200).json({ success: true, data: { ...userDetails, posts } });
  } catch (err) {
    console.log(err);
    res.status(503).json({ success: false, data: "Something went wrong" });
  }
};

const ToogleUserFollowTo = async (req, res) => {
  try {
    let { user, followTo } = req;
    if (user.following.id(followTo._id)) {
      user.following.id(followTo._id).remove();
      followTo.followers.id(user._id).remove();
    } else {
      const updateUserFollowering = concat(user.following, [
        { _id: followTo._id, user: followTo._id },
      ]);
      const updatedUserToFollower = concat(followTo.followers, [
        { _id: user._id, user: user._id },
      ]);
      user.following = extend(user.following, updateUserFollowering);
      followTo.follower = extend(followTo.followers, updatedUserToFollower);
      saveFollowNotification(followTo._id, user._id);
    }
    await user.save();
    await followTo.save();
    res.status(200).json({ success: true, data: "User follower list updated" });
  } catch (err) {
    console.log(err);
    res.status(503).json({ success: true, error: "Something went wrong" });
  }
};

module.exports = {
  sendData,
  ToogleUserFollowTo,
};
