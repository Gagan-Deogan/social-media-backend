const { Notification } = require("../models/notification.model");

const userPopulateOptions = {
  path: "sourceUser",
  select: "username fullname imageURL",
};
const postPopulateOptions = {
  path: "post",
  select: "title imageURL",
};
const getUserNotifications = async (req, res) => {
  try {
    const { user } = req;
    const notifications = await Notification.find(
      { targetUser: user._id },
      { targetUser: 0, __v: 0 }
    )
      .populate(userPopulateOptions)
      .populate(postPopulateOptions);
    res.status(200).json({ success: true, data: notifications });
  } catch (err) {
    res.status(503).json({ success: false, error: "Something went worng" });
  }
};

module.exports = { getUserNotifications };
