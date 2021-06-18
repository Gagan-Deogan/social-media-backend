const { Notification } = require("../models/notification.model");

const getUserNotifications = async (req, res) => {
  try {
    const { user } = req;
    const notifications = await Notification.find({ targetUser: user._id });
    res.status(200).json({ success: false, data: notifications });
  } catch (err) {
    console.log(err);
    res.status(503).json({ success: false, error: "Something went worng" });
  }
};

module.exports = { getUserNotifications };
