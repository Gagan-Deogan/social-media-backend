const { extend, concat } = require("lodash");

const { User } = require("../models/user.model");
const {
  issueJWT,
  generateHash,
  isValidPassword,
  extractProtectedKey,
} = require("../utils/security.utils");

const userLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();
    let user = await User.findOne({ email });
    if (user) {
      const match = await isValidPassword(password, user.password);
      if (match) {
        const jwt = issueJWT(user._id);
        user = extractProtectedKey(user);
        return res.status(200).json({
          success: true,
          data: { currentUser: user, token: jwt.token },
        });
      }
    }
    res.status(422).json({ success: false, data: "Invalid Username/Password" });
  } catch (err) {
    res.status(500).json({ success: false, error: "something went wrong" });
  }
};

const newUser = async (req, res) => {
  try {
    let user = req.body;
    user.email = user.email.toLowerCase();
    user.username = user.username.toLowerCase();
    const isAlreadyExists = await User.findOne({
      $or: [{ email: user.email }, { username: user.username }],
    });
    if (isAlreadyExists) {
      if (isAlreadyExists.email === user.email) {
        res.status(422).json({ success: false, data: "Email Already Exists" });
      } else {
        res
          .status(422)
          .json({ success: false, data: "Username Already Exists" });
      }
    } else {
      user.password = await generateHash(user.password);
      let NewUser = new User(user);
      await NewUser.save();
      res.status(201).json({ success: true, data: "Sign up Successfully" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: "something went wrong" });
  }
};

const userDetails = (req, res) => {
  try {
    let { user } = req;
    user = extractProtectedKey(user);
    res.status(200).json({ success: true, data: { currentUser: user } });
  } catch (err) {
    res.status(500).json({ success: false, error: "something went wrong" });
  }
};

const chnagePassword = async (req, res) => {
  try {
    let { user } = req;
    const { oldPassword, newPassword } = req.body;
    const match = await isValidPassword(oldPassword, user.password);
    if (match) {
      user.password = await generateHash(newPassword);
      const updatedUser = await user.save();
      res.status(200).json({ success: true, data: "Successfull Update" });
    } else {
      res
        .status(422)
        .json({ success: false, data: "Old password isn't valid" });
    }
  } catch (err) {
    res.status(500).json({ success: false, error: "something went wrong" });
  }
};

module.exports = {
  userDetails,
  newUser,
  userLogin,
  chnagePassword,
};
