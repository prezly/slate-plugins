const path = require("path");
const webpack = require("webpack");

const DefinePluginConfig = new webpack.DefinePlugin({
  "process.env.NODE_ENV": JSON.stringify("production")
});

const UglifyJsPluginConfig = new webpack.optimize.UglifyJsPlugin({
    beautify: false,
    mangle: {
      screw_ie8: true,
    },
    compress: {
      screw_ie8: true,
    },
    comments: false,
  });

module.exports = {
  entry: path.join(__dirname, "/src/index.js"),
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  output: {
    filename: "index.js",
    path: path.join(__dirname, "/lib")
  },
  plugins: [DefinePluginConfig, UglifyJsPluginConfig]
};
