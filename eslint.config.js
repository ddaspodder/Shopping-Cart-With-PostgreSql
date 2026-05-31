module.exports = {
  files: ["**/*.js", "**/*.ts"],
  languageOptions: {
    parser: require.resolve("@typescript-eslint/parser"),
    parserOptions: {
      project: "./tsconfig.json",
      tsconfigRootDir: __dirname,
      ecmaVersion: 2021,
      sourceType: "module",
      extraFileExtensions: [".ts", ".tsx"],
    },
    ecmaVersion: 2021,
    sourceType: "module",
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
  plugins: {
    "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
  },
  linterOptions: {
    reportUnusedDisableDirectives: true,
  },
  rules: {
    // Use TypeScript-aware rule instead of the base rule
    "no-unused-vars": "off",
    "@typescript-eslint/no-unused-vars": ["warn"],
    "no-undef": "error",
    "no-console": "off",
  },
};
