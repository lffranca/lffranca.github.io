const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');

const INDEX_DIR = path.resolve(__dirname, "index.html");
const JS_APP_DIR = path.resolve(__dirname, "src", "js", "index.js");
const JS_BUILD_DIR = path.resolve(__dirname);
const JS_BUILD_FILENAME = "app.bundle.js";
const JS_BUILD_SERVER = path.resolve(JS_BUILD_DIR, JS_BUILD_FILENAME);

module.exports = {
  mode: "development",
  entry: JS_APP_DIR,
  output: {
    path: JS_BUILD_DIR,
    filename: JS_BUILD_FILENAME
  },
  devServer: {
    index: INDEX_DIR,
    filename: JS_BUILD_SERVER
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inlineSource: '.(js|css)$' // embed all javascript and css inline
    }),
    new HtmlWebpackInlineSourcePlugin()
  ],
  stats: {
    colors: true
  },
  devtool: "source-map"
};
