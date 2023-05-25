const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const isProduction = process.env.NODE_ENV == "production";

const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : "style-loader";

const config = {
  entry: {
    main: path.resolve(__dirname, "src/js/index.js")
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name][contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
    publicPath: ""
  },
  devtool: "source-map",
  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist")
    },
    port: 3000,
    open: true,
    host: "localhost",
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "JS Project | Education",
      filename: "index.html",
      template: "index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "style/[name][contenthash].css",
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/assets/img/favicon.ico", to: "img/favicon.ico"}
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/i,
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: [stylesHandler, "css-loader"],
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: "asset",
        generator: {
          filename: "font/[name][ext]"
        }
      },
      {
       test: /\.(png|jpe?g|gif|webp|svg|ico)$/i,
       type: "asset/resource",
       generator: {
        filename: "img/[name][ext]"
       },
       use: [
        {
          loader: "file-loader",
          options: {
            name: "[name].[contenthash].[ext]",
            outputPath: "img"
          }
        }
       ]
      }
    ]
  }
};

module.exports = () => {
  if (isProduction) {
    config.mode = "production";
    config.plugins.push(new MiniCssExtractPlugin());
  } else {
    config.mode = "development";
  }
  return config;
};
