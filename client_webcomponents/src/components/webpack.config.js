const path = require("path");

module.exports = {
  entry: "./main.js",
  mode: "production",
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true
            }
          }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        query: {
          presets: ['@babel/react'],
          plugins: ['@babel/proposal-class-properties']
        }
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, "_dist")
  }
};
