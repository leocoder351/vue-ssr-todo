const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const VueClientPlugin = require('vue-server-renderer/client-plugin');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';

let config;

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: isDev ? JSON.stringify('development') : JSON.stringify('production')
    }
  }),
  new HtmlWebpackPlugin({
    template: path.resolve(__dirname, 'template.html')
  })
];

const devServer = {
  port: 8000,
  host: '0.0.0.0',    // 可以用 127.0.0.1 localhost 或者 本机ip访问
  open: false,    // 是否自动打开浏览器
  hot: true,
  overlay: {
    errors: true
  },
  historyApiFallback: {
    index: '/index.html'
  }
};

if (isDev) {
  config = merge(baseConfig, {
    entry: {
      app: path.resolve(__dirname, '../client/entry-client.js')
    },
    devtool: '#cheap-module-eval-source-map',
    devServer: devServer,
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
    entry: {
      app: path.resolve(__dirname, '../client/entry-client.js')
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
          use: ExtractTextPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPlugins.concat([
      new CleanWebpackPlugin([path.resolve(__dirname, '../dist')]),
      new ExtractTextPlugin('style.[chunkhash:8].css'),
      new VueClientPlugin()
    ])
  });
}

module.exports = config;
