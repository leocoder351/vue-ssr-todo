const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const createVueLoaderOptions = require('./vue-loader.config');

const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  mode: process.env.NODE_ENV || 'production',
  target: 'web',

  output: {
    filename: 'bundle.[hash:8].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/'
  },

  module: {
    rules: [
      // {
      //   test: /\.(vue|js|jsx)$/,
      //   use: 'eslint-loader',
      //   exclude: /node_modules/,
      //   enforce: 'pre'
      // },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['transform-vue-jsx']
          }
        }
      },
      {
        test: /\.(jpeg|jpg|png|gif|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            name: 'resources/images/[name].[hash:8].[ext]'
          }
        }
      },
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: createVueLoaderOptions(isDev)
        }
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),
  ]
};
