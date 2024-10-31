const path = require("path"),
  webpack = require("webpack"),
  MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, options) => {
  console.log("Mode: " + options.mode);

  let isProduction = false;
  if ("production" === options.mode) {
    isProduction = true;
  }

  return {
    entry: "./src/index.tsx",
    mode: isProduction ? "production" : "development",
    watch: true,
    watchOptions: {
      ignored: /node_modules/,
    },
    output: {
      path: path.resolve(__dirname, "./../../../assets/dist/admin/pages"),
      filename: "woopriceman.min.js",
    },
    resolve: {
      extensions: [".js", ".ts", ".tsx"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                {
                  // "debug": true,
                  useBuiltIns: "usage",
                  corejs: 3,
                },
              ],
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
            },
            {
              loader: "css-loader",
            },
          ],
        },
        {
          test: /\.(woff|woff2)$/,
          type: "asset/resource",
          generator: {
            filename: "fonts/[hash][ext][query]",
          },
        },
      ],
    },
    plugins: [
      new webpack.ProvidePlugin({
        React: "react",
        ReactDOM: "react-dom",
      }),
      new MiniCssExtractPlugin({
        filename: "./woopriceman.min.css",
      }),
    ],
  };
};
