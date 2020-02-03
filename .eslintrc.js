module.exports = {
  root: true,
  env: {
    node: true,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prettier/prettier": "error",
    indent: "off",
    "@typescript-eslint/indent": ["error", 2],
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
  },
  extends: [
    "plugin:vue/base",
    "plugin:vue/recommended",
    "@vue/prettier",
    "@vue/typescript",
    "@vue/airbnb",
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
};
