const formatUser = (user) => {
  return {
    id: user._id.toString(),
    email: user.email,
  };
};

module.exports = { formatUser };
