const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';

let config;

const defaultPlugins = [
  new CleanWebpackPlugin([path.resolve(__dirname, '../dist')]),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('development')
    }
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'template.html')
  })
];

const devServer = {
  port: 9000,
  host: '0.0.0.0',    // 可以用 127.0.0.1 localhost 或者 本机ip访问
  open: false,    // 是否自动打开浏览器
  hot: true,
  overlay: {
    errors: true
  }
};


config = merge(baseConfig, {
  entry: path.resolve(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  devServer: devServer,
  resolve: {
    alias: {
      'vue': path.resolve(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: ['style-loader', 'css-loader', {
          loader: 'postcss-loader',
          options: {
            sourceMap: true
          }
        }, 'stylus-loader']
      }
    ]
  },
  plugins: defaultPlugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ])
});

module.exports = config;
