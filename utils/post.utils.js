const { map } = require("lodash");

const isUserLikeThePost = (post, user) => {
  return post.likesBy.id(user._id);
};

const getLikedByCurrentUserFlag = (posts, user) => {
  const result = posts.map((post) => {
    const isCurrentUserLike = post.likesBy.find(
      (likedUser) => likedUser._id == String(user._id)
    );
    if (isCurrentUserLike) {
      return { ...post, currentUserLike: true };
    }
    return { ...post, currentUserLike: false };
  });
  return result;
};

module.exports = { isUserLikeThePost, getLikedByCurrentUserFlag };
