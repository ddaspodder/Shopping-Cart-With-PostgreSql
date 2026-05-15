const success = (res, data = null, code = 200) => {
  res.status(code).json({
    status: "success",
    data,
  });
};

const failure = (res, err, code) => {
  res.status(code || err.statusCode || 500).json({
    status: "failure",
    message: err.message || "internal server error",
  });
};

module.exports = { success, failure };
