module.exports = {
  root: true,
  env: { node: true },
  plugins: ["prettier", "vuetify"],
  rules: {
    // TODO: eventually switch this to "error" for deployment
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    indent: "off",
    "@typescript-eslint/indent": ["error", 2],
    "@typescript-eslint/no-unused-vars": "error",
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
    "vuetify/no-deprecated-classes": "error",
    "vuetify/grid-unknown-attributes": "error",
    "vuetify/no-legacy-grid": "error",
    quotes: ["error", "double"],
  },
  parser: "vue-eslint-parser",
  parserOptions: { parser: "@typescript-eslint/parser" },
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/recommended",
    "@vue/airbnb",
    "@vue/typescript",
    "plugin:prettier/recommended",
    "prettier/@typescript-eslint",
    "prettier/vue",
  ],
};
