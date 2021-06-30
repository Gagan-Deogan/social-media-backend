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
    default:
      "https://firebasestorage.googleapis.com/v0/b/soical-media-5efd9.appspot.com/o/Group%2015%201.png?alt=media&token=fe3165e0-9c88-4ffa-a4cc-2664f15731a9",
  },
  headerImageURL: {
    type: String,
    default:
      "https://firebasestorage.googleapis.com/v0/b/soical-media-5efd9.appspot.com/o/Rectangle%2023.png?alt=media&token=5f4020e9-0e95-4a68-baf9-ad08cb47f9fc",
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
