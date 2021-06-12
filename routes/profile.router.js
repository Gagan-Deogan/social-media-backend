const express = require("express");
const router = express.Router();
const {
  getProfileByUsername,
  getProfilePosts,
} = require("../controllers/params");
const { sendData } = require("../controllers/profile.controller");
router.param("username", getProfileByUsername);
router.param("username", getProfilePosts);
router.get("/:username", sendData);

module.exports = router;
