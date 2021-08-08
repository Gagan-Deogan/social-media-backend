const express = require("express");
const { authenticate } = require("../config/passport");
const {
  createPost,
  getPostsOfFollowings,
  likePost,
} = require("../controllers/post.controller");
const { getPostById } = require("../controllers/params");
const router = express.Router();
router.use(authenticate);
router.get("/", getPostsOfFollowings);
router.post("/", createPost);
router.param("postId", getPostById);
router.put("/:postId", likePost);
module.exports = router;
