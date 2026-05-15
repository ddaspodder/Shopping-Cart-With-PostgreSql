module.exports = {
  files: ["**/*.js"],
  languageOptions: {
    ecmaVersion: 2021,
    sourceType: "script",
    globals: {
      process: "readonly",
      module: "readonly",
      require: "readonly",
      console: "readonly",
      __dirname: "readonly",
      Buffer: "readonly",
      setTimeout: "readonly",
      clearTimeout: "readonly",
      describe: "readonly",
      it: "readonly",
      test: "readonly",
      expect: "readonly",
      beforeAll: "readonly",
      afterAll: "readonly",
      beforeEach: "readonly",
      afterEach: "readonly",
      jest: "readonly",
    },
  },
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  rules: {
    "no-unused-vars": ["warn"],
    "no-undef": "error",
    "no-console": "off",
  },
};
