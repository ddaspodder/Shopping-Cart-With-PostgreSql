const formatUser = (user) => {
  return {
    id: user.id.toString(),
    email: user.email,
  };
};

module.exports = { formatUser };
