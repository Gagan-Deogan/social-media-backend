const express = require("express");
const { authenticate } = require("../config/passport");
const {
  getUserNotifications,
} = require("../controllers/notifications.controller");
const router = express.Router();

router.use(authenticate);
router.get("/", getUserNotifications);

module.exports = router;
