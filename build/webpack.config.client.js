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
      NODE_ENV: isDev ? JSON.stringify('development') : JSON.stringify('production')
    }
  }),
  new HtmlWebpackPlugin()
];

const devServer = {
  port: 8000,
  host: '0.0.0.0',    // 可以用 127.0.0.1 localhost 或者 本机ip访问
  open: false,    // 是否自动打开浏览器
  hot: true,
  overlay: {
    errors: true
  }
};

if (isDev) {
  config = merge(baseConfig, {
    mode: 'development',
    devtool: '#cheap-module-eval-source-map',
    devServer: devServer,
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
} else {
  config = merge(baseConfig, {
    mode: 'production',
    entry: {
      app: path.resolve(__dirname, '../client/index.js'),
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    optimization: {
      splitChunks: {
        cacheGroups: {
          commons: {
            name: 'vendor',
            chunks: 'initial',
            minChunks: 2
          }
        }
      },
      runtimeChunk: {
        name: 'runtime'
      }
    },
    module: {
      rules: [
        {
          test: /\.styl(us)?$/,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new MiniCssExtractPlugin({
        filename: '[name].[contentHash:8].css'
      })
    ])
  });
}

module.exports = config;