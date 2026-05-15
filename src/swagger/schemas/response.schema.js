const Internal = {
  description: "Internal Server Error",
  content: {
    "application/json": {
      schema: {
        type: "object",
        properties: {
          status: {
            type: "string",
            default: "failure",
          },
          message: {
            type: "string",
            default: "Internal Server Error",
            description: "Error message",
          },
        },
      },
    },
  },
};

module.exports = { Internal };
