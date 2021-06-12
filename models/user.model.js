const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
  image: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = { User };
