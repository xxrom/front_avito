module.exports = {
  parser: "babel-eslint",
  extends: ["eslint:recommended", "plugin:react/recommended"],
  plugins: ["import", "react", "react-hooks"],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  rules: {
    "no-mixed-spaces-and-tabs": "off",
    "import/no-default-export": "off",
    "import/order": "off",
    "no-undefined": "error",
    "no-undef-init": "error",
    "prefer-arrow-callback": "error",
    "prefer-const": "error",
    "yield-star-spacing": "error",
    "no-eq-null": "error",
    yoda: "error",
    "@typescript-eslint/no-explicit-any": "off",
    "no-var": "error",
    "react/prop-types": 0,
    "react/no-unescaped-entities": 0,
    "no-use-before-define": "off",
    "no-irregular-whitespace": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-empty-function": "off",
    "padding-line-between-statements": [
      "error",
      { blankLine: "always", prev: "*", next: "return" },
    ],
    "no-console": [
      "error",
      {
        allow: ["warn"],
      },
    ],
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
      },
    },
    {
      files: ["*.tsx", "*.ts"],
      rules: {
        "no-fallthrough": "off",
        "valid-typeof": "off",
        "no-redeclare": "off",
        "@typescript-eslint/no-require-imports": "error",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": "error",
        "@typescript-eslint/no-use-before-define": "off",
        "no-dupe-class-members": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
      },
    },
  ],
  globals: {
    nameof: "readonly",
    __VERSION: "readonly",
    chrome: "readonly",
  },
};
