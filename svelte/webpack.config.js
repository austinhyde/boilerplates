const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const sveltePreprocess = require('svelte-preprocess');

module.exports = (env, argv) => {
  const IS_DEV = argv.mode === 'development';

  const HOST = process.env.DEV_SERVER_HOST || 'localhost';
  const PORT = process.env.DEV_SERVER_PORT || 8080;

  const config = {
    output: {
      path: path.resolve(__dirname, './dist'),
      filename: 'main.js',
    },
    devServer: {
      hot: true,
      port: PORT,
      host: HOST,
    },
    module: {
      rules: [
        { test: /\.svelte$/, use: {
          loader: 'svelte-loader-hot',
          options: {
            dev: IS_DEV,
            preprocess: sveltePreprocess(),
            emitCss: !IS_DEV,
            hotReload: IS_DEV,
          },
        }},
        { test: /\.(sa|sc|c)ss$/, use: [(IS_DEV?'style-loader':MiniCssExtractPlugin.loader), 'css-loader', 'sass-loader'] },
        { test: /\.eot(\?v=.*)?$/, use: ['file-loader'] },
        { test: /\.(ico|png|gif|jpe?g)$/i, use: ['file-loader'] },
        { test: /\.woff2?(\?v=.*)?$/, use: [{ loader: 'url-loader', options: { prefix: 'font/', limit: 5000 } }] },
        { test: /\.ttf(\?v=.*)?$/, use: [{ loader: 'url-loader', options: { mimetype: 'application/octet-stream', limit: 10000 } }] },
        { test: /\.svg(\?v=.*)?$/, use: [{ loader: 'url-loader', options: { mimetype: 'image/svg+xml', limit: 10000 } }] },
        // required to prevent errors from Svelte on Webpack 5+
        { test: /node_modules\/svelte\/.*\.mjs$/, resolve: {fullySpecified: false}},
      ],
    },
    resolve: {
      alias: {
        svelte: path.dirname(require.resolve('svelte/package.json')),
      },
      extensions: ['.mjs', '.js', '.svelte'],
      mainFields: ['svelte', 'browser', 'module', 'main'],
    },
    plugins: [
      new HtmlWebpackPlugin({alwaysWriteToDisk: true}),
      new HtmlWebpackHarddiskPlugin(),
    ],
  };

  if (IS_DEV) {
    config.output.publicPath = config.devServer.publicPath;
    config.plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    config.plugins.push(new MiniCssExtractPlugin());
  }

  return config;
}