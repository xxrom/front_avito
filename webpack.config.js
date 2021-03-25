const path = require("path");
const webpack = require("webpack");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => ({
  devtool: "source-map",
  entry: path.resolve(__dirname, "src/index.js"),
  mode: env.NODE_ENV === "development" ? "development" : "production",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
          },
          {
            loader: "linaria/loader",
            options: {
              sourceMap: process.env.NODE_ENV !== "production",
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV !== "production",
            },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: process.env.NODE_ENV !== "production",
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|webp)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10,
              name: "[name].[ext]",
              context: "",
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
            },
          },
        ],
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        use: "url-loader?limit=10000&mimetype=image/svg+xml",
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    chunkFilename: "[name].bundle.js",
    filename: "[name].[hash].js",
  },

  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    host: "0.0.0.0",
    hot: true,
    port: 3333,
    historyApiFallback: true,
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebPackPlugin({
      inject: true,
      templateContent: `<html>
<body>
  <div id="root"></div>
  <script src="/dist/bundle.js"></script>
</body>
</html>`,
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
  ],
});
