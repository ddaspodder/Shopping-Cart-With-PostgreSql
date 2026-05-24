const success = (res, data = null, code = 200) => {
  res.status(code).json({
    status: "success",
    data,
  });
};

const failure = (res, message, code) => {
  res.status(code || 500).json({
    status: "failure",
    message: message || "internal server error",
  });
};

module.exports = { success, failure };
