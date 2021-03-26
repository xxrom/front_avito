module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "10",
        },
      },
    ],
    "@babel/preset-react",
    "linaria/babel",
  ],
  plugins: [
    [
      "react-hot-loader/babel",
      {
        safetyNet: false,
      },
    ],
    [
      "@babel/plugin-proposal-decorators",
      {
        legacy: true,
      },
    ],
    "@babel/plugin-transform-runtime",
    "@babel/plugin-proposal-function-sent",
    "@babel/plugin-proposal-export-namespace-from",
    "@babel/plugin-proposal-numeric-separator",
    "@babel/plugin-proposal-throw-expressions",
    "@babel/plugin-syntax-dynamic-import",
    "@babel/plugin-syntax-import-meta",
    [
      "@babel/plugin-proposal-class-properties",
      {
        loose: false,
      },
    ],
    "@babel/plugin-proposal-json-strings",
  ],
};
