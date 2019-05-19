const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const IS_DEV = argv.mode === 'development';

  const config = {
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
        { test: /\.(sa|sc|c)ss$/, use: [(IS_DEV?'style-loader':MiniCssExtractPlugin.loader), 'css-loader', 'sass-loader'] },
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
      new HtmlWebpackHarddiskPlugin(),
    ]
  };

  if (IS_DEV) {
    config.output.publicPath = config.devServer.publicPath;
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    config.plugins.push(new MiniCssExtractPlugin());
  }

  return config;
}