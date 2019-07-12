"use strict";

const path = require('path');
const CopyWebpack = require('copy-webpack-plugin');
const HtmlWebpack = require('html-webpack-plugin');
const ExtractText = require('extract-text-webpack-plugin');
const SpeedPlugin = require("speed-measure-webpack-plugin");
const CleanPlugin = require('clean-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const webpack = require('webpack');

const OUTPUT = 'build'
const smp = new SpeedPlugin();
const isProduction = getMode() === 'production';

const config = {
  watch: ! isProduction,
  mode: getMode(),
  entry: `./web/index.js`,
  output: {
    path: path.resolve(OUTPUT),
    filename: (chunkData) => {
      return chunkData.chunk.name === 'main' ? '[name].js': '[name]/[contenthash].js';
    },
  },
  devtool: 'inline-source-map',
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    },
  },
  module: {
    rules: [
      {
        test: [
          /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
          /\.(gif|png|jpe?g|svg)$/
        ],
        exclude: ['/IconSvg/sprite'],
        use: {
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
          }
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.(html)$/,
        exclude: /node_modules/,
        loader: "html-loader",
      },
      {
        test: /\.(vue)$/,
        loader: [
          'vue-loader',
          'vue-style-loader',
          'css-loader'
        ],
      },
    ]
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@components': path.join(__dirname, 'web/src/components'),
      '@containers': path.join(__dirname, 'web/src/containers'),
      '@lib': path.join(__dirname, 'web/src/lib'),
    },
  },
  plugins:[
    new VueLoaderPlugin(),
    new CleanPlugin(path.join(__dirname, OUTPUT)),
    new CopyWebpack([
      { from: 'web/img/', to: 'web/img'},
    ]),
    new HtmlWebpack({ template: `./web/index.html` }),
    new webpack.HashedModuleIdsPlugin(),
  ],
};

module.exports = isProduction ? config : smp.wrap(config)

function getMode() {
  return process.env.NODE_ENV || 'production'
}