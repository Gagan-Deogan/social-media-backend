const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const user = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: "User required for like",
  },
});
const UserSchema = Schema({
  fullname: {
    type: String,
    required: "User fullname required",
  },
  username: {
    type: String,
    unique: "username should be unique",
    required: "Username required",
  },
  email: {
    type: String,
    required: "User email required",
  },
  password: {
    type: String,
    required: "password required",
  },
  imageURL: {
    type: String,
  },
  headerImageURL: {
    type: String,
  },
  bio: {
    type: String,
    maxLength: 160,
  },
  following: [user],
  followers: [user],
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
