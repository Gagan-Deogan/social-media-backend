const getIsFollowFlagAndExtractFollowersAndFollowing = (
  userDetails,
  currentUser
) => {
  const isFollow = !!userDetails.followers.id(currentUser._id);
  const leanObject = userDetails.toObject();
  leanObject.followersLength = leanObject.followers.length;
  leanObject.followingLength = leanObject.following.length;
  leanObject.following = leanObject.following.map((follow) => follow.user);
  leanObject.followers = leanObject.followers.map((follower) => follower.user);
  return {
    ...leanObject,
    isFollow,
  };
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
  getIsFollowFlagAndExtractFollowersAndFollowing,
};
