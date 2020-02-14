module.exports = {
  root: true,
  env: { node: true },
  plugins: ["prettier"],
  rules: {
    // TODO: eventually switch this to "error" for deployment
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prettier/prettier": "error",
    indent: "off",
    "@typescript-eslint/indent": ["error", 2],
    "object-curly-newline": [
      "error",
      {
        ObjectExpression: { multiline: true },
        ObjectPattern: { multiline: true },
        ImportDeclaration: "never",
        ExportDeclaration: { multiline: true, minProperties: 3 },
      },
    ],
    "vue/attributes-order": "off",
  },
  parser: "vue-eslint-parser",
  parserOptions: { parser: "@typescript-eslint/parser" },
  extends: [
    "plugin:prettier/recommended",
    "plugin:@typescript-eslint/recommended",
    "@vue/typescript",
    "@vue/airbnb",
    "plugin:vue/recommended",
    "@vue/prettier",
  ],
};
