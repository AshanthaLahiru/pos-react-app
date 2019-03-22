const path = require("path");
const HtmlWeboackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "./dist"),
    filename: "index_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(png|jpg|gif|swf)$/,
        use: 'file-loader'
      },
      {
        test: /\.(ttf|eot|svg|woff(2)?)(\S+)?$/,
        use: 'file-loader'
      }
    ]
  },
  plugins: [
    new HtmlWeboackPlugin({
      template: "./src/home.html"
    })
  ]
};
