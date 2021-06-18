const getFollowByCurrentUserFlagAndLeanModel = (userDetails, currentUser) => {
  const isFollow = !!userDetails.followers.id(currentUser._id);
  const leanObject = userDetails.toObject();
  return { ...leanObject, isFollow };
};

const getLikedByCurrentUserFlag = (posts, currentUser) => {
  const result = posts.map((post) => {
    const isCurrentUserLike = post.likesBy.find(
      (likedUser) => likedUser._id == String(currentUser._id)
    );
    if (isCurrentUserLike) {
      return { ...post, currentUserLike: true };
    }
    return { ...post, currentUserLike: false };
  });
  return result;
};

module.exports = {
  getLikedByCurrentUserFlag,
  getFollowByCurrentUserFlagAndLeanModel,
};
