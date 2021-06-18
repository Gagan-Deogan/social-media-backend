const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({
  text: {
    type: String,
    required: "Notification Text Required",
  },
  notificationType: {
    type: String,
    enum: ["FOLLOW", "LIKE"],
  },
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post" },
  targetUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "User required for Notification",
  },
  sourceUser: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "User required for Notification",
  },
});

const Notification = mongoose.model("Notification", NotificationSchema);
module.exports = { Notification };
