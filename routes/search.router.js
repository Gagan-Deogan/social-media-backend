const express = require("express");
const { authenticate } = require("../config/passport");
const { searchUsersByUsername } = require("../controllers/params");
const { sendSearchResult } = require("../controllers/search.controller");
const router = express.Router();

router.use(authenticate);
router.param("username", searchUsersByUsername);
router.get("/:username", sendSearchResult);

module.exports = router;
