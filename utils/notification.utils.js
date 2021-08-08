const { Notification } = require("../models/notification.model");

const notificationTemplate = {
  like: "Likes Your Post.",
  follow: "started Following You.",
};

const saveLikeNotfication = async (sourceUserId, targetUserId, PostId) => {
  try {
    if (String(targetUserId) === String(sourceUserId)) {
      return undefined;
    }
    const isAreadyPresent = await Notification.findOne({
      targetUser: targetUserId,
      sourceUser: sourceUserId,
      notificationType: "LIKE",
      post: PostId,
    });
    if (!isAreadyPresent) {
      const notification = new Notification({
        targetUser: targetUserId,
        sourceUser: sourceUserId,
        notificationType: "LIKE",
        post: PostId,
        text: notificationTemplate.like,
      });
      await notification.save();
    }
  } catch (err) {
    console.log(err);
  }
};

const saveFollowNotification = async (targetUserId, sourceUserId) => {
  try {
    if (String(targetUserId) === String(sourceUserId)) {
      return undefined;
    }
    const isAreadyPresent = await Notification.findOne({
      targetUser: targetUserId,
      sourceUser: sourceUserId,
      notificationType: "FOLLOW",
    });
    if (!isAreadyPresent) {
      const notification = new Notification({
        targetUser: targetUserId,
        sourceUser: sourceUserId,
        notificationType: "FOLLOW",
        text: notificationTemplate.follow,
      });
      await notification.save();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { saveLikeNotfication, saveFollowNotification };
