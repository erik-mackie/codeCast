var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    app: ['./src/index.js']
  },
  target: 'electron-main',
  output: {
    path: path.join(__dirname, 'public/build'),
    filename: 'bundle.js',
    publicPath: path.join(__dirname,'public/build/') // change in production to '/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      { 
        test: /\.s$css/,
        use: ['style-loader', 'sass-loader', 'css-loader']
      },
    ]
  },
  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: './public/index.html'
    })
  ]
}