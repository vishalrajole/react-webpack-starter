const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = (env) => {
  const dev = env.development;

  return {
    entry: "./src/index.js",

    output: {
      path: path.resolve(__dirname, "../dist"),
      filename: "bundle.js",
    },

    devtool: dev ? "source-map" : "eval-cheap-module-source-map",

    module: {
      rules: [
        { test: /\.(js)$/, use: "babel-loader" },
        {
          test: /\.(s*)css$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },

    plugins: [
      new CleanWebpackPlugin(),
      new webpack.ProgressPlugin(),
      // new webpack.SourceMapDevToolPlugin({
      //   filename: "[name].js.map",
      //   exclude: ["vendor.js"],
      // }),
      new HtmlWebpackPlugin({
        template: "public/index.html",
      }),
    ],

    // mode: "development",
    optimization: {
      moduleIds: "hashed",
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      },
    },
  };
};
