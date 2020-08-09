const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (env) => {
  const isDevelopment = env === "development";
  const isProduction = env === "production";

  return {
    entry: "./src/index.js",

    output: {
      path: path.resolve(__dirname, "../dist"),
      filename: isProduction
        ? "[name].[contenthash].bundle.js"
        : "[name].bundle.js",
      chunkFilename: isProduction
        ? "[name].[contenthash].bundle.js"
        : "[name].bundle.js",
    },

    devtool: isProduction ? "source-map" : "eval-cheap-source-map",
    mode: isProduction ? "production" : "development",
    devServer: {
      contentBase: path.join(__dirname, "../dist"), // ??
      historyApiFallback: true,
    },
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
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        openAnalyzer: false,
      }),
      new HtmlWebpackPlugin({
        template: "public/index.html",
        hash: true,
      }),
    ],

    optimization: {
      moduleIds: "hashed",
      minimize: true,
      minimizer: [new TerserPlugin()],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
            priority: -10,
          },
        },
      },
      // bare minimum to get app up & running for initial route
      runtimeChunk: {
        name: "manifest",
      },
    },
  };
};
