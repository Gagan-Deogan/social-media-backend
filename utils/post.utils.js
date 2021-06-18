const { map } = require("lodash");

const isUserLikeThePost = (post, user) => {
  return post.likesBy.id(user._id);
};

module.exports = { isUserLikeThePost };
