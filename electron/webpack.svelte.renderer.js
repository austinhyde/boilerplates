const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sveltePreprocess = require('svelte-preprocess');

const IS_DEV = process.env.NODE_ENV !== 'production';

console.log({IS_DEV});

const config = {
  resolve: {
    alias: {
      svelte: path.dirname(require.resolve('svelte/package.json')),
    },
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
  devServer: {
    hot: true,
  },
  devtool: IS_DEV ? 'source-map' : false,
  module: {
    rules: [
      { test: /\.svelte$/, use: {
        loader: 'svelte-loader-hot',
        options: {
          dev: IS_DEV,
          preprocess: sveltePreprocess(),
          emitCss: !IS_DEV,
          hotReload: IS_DEV
        },
      }},
      { test: /\.eot(\?v=.*)?$/, use: ['file-loader'] },
      { test: /\.(ico|png|gif|jpe?g)$/i, use: ['file-loader'] },
      { test: /\.woff2?(\?v=.*)?$/, use: [{ loader: 'url-loader', options: { prefix: 'font/', limit: 5000 } }] },
      { test: /\.ttf(\?v=.*)?$/, use: [{ loader: 'url-loader', options: { mimetype: 'application/octet-stream', limit: 10000 } }] },
      { test: /\.svg(\?v=.*)?$/, use: [{ loader: 'url-loader', options: { mimetype: 'image/svg+xml', limit: 10000 } }] },
      // use with webpack ^5; electron-webpack currently uses webpack 4
      // { test: /node_modules\/svelte\/.*\.mjs$/, resolve: {fullySpecified: false}},
    ],
  },
  plugins: [],
};

if (IS_DEV) {
  // config.plugins.push(new webpack.HotModuleReplacementPlugin());
} else {
  config.plugins.push(new MiniCssExtractPlugin());
}
module.exports = config;