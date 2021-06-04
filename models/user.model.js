const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = Schema({
  name: {
    type: String,
    required: "User Firstname required",
  },
  username: {
    type: String,
    unique: "username should be unique",
    required: "Username required",
  },
  image: {
    type: String,
  },
  googleId: {
    type: String,
  },
});

const User = mongoose.model("User", UserSchema);
