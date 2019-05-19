const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'main.js',
  },
  devServer: {
    hot: true,
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, use: 'babel-loader' },
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
      { test: /\.eot(\?v=.*)?$/, use: ['file-loader'] },
      { test: /\.(ico|png|gif|jpe?g)$/i, use: ['file-loader'] },
      { test: /\.woff2?(\?v=.*)?$/, use: [{ loader: 'url-loader', options: { prefix: 'font/', limit: 5000 } }] },
      { test: /\.ttf(\?v=.*)?$/, use: [{ loader: 'url-loader', options: { mimetype: 'application/octet-stream', limit: 10000 } }] },
      { test: /\.svg(\?v=.*)?$/, use: [{ loader: 'url-loader', options: { mimetype: 'image/svg+xml', limit: 10000 } }] }
    ]
  },
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom'
    }
  },
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ]
}