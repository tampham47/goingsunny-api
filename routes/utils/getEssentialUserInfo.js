
// return mininum user information, that's needed for almost cases
module.exports = (user) => {
  return {
    _id: user._id,
    avatar: user.avatar,
    displayName: user.displayName,
  };
};
