const dotEnv = require("dotenv");

const getEnvPath = () => {
  switch (process.env) {
    case "production":
      return ".env";
    case "development":
      return ".env.local";
    case "test":
      return ".env.test";
    default:
      return ".env";
  }
};

const setupEnv = () => {
  const envPath = getEnvPath();
  dotEnv.config({ path: envPath });
};

module.exports = { setupEnv, getEnvPath };
