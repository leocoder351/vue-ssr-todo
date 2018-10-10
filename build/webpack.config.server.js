const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const VueServerPlugin = require('vue-server-renderer/server-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

let config;

config = merge(baseConfig, {
  target: 'node',
  entry: path.resolve(__dirname, '../client/server-entry.js'),
  devtool: 'source-map',
  output: {
    libraryTarget: 'commonjs2',
    filename: 'server-entry.js',
    path: path.resolve(__dirname, '../server-build')
  },
  externals: Object.keys(require('../package.json').dependencies),
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: ['vue-style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        }, 'stylus-loader']
        // use: ExtractTextPlugin.extract({
        //   fallback: 'vue-style-loader',
        //   use: [
        //     'css-loader',
        //     {
        //       loader: 'postcss-loader',
        //       options: {
        //         sourceMap: true
        //       }
        //     },
        //     'stylus-loader'
        //   ]
        // })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.[chunkhash:8].css'),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': JSON.stringify('server')
    }),
    new VueServerPlugin()
  ]
});

module.exports = config;
