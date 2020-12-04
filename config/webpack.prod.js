const webpack = require("webpack");
const Merge = require("webpack-merge");
const CommonConfig = require("./webpack.common.js");

module.exports = Merge(CommonConfig, {
  devtool: false,
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.DefinePlugin({
      "process.env": {
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: false
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ],
  module: {
    rules: [{
      test: /\.js$/,
      use: {
        loader: "babel-loader"
      }
    }
    ]
  }
});
