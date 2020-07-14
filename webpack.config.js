const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

const TerserPlugin = require('terser-webpack-plugin');

const config = {

  context: path.resolve(__dirname, 'src'),

  entry: {
    polyfills: './polyfills.js',
    app: './index.js'
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: './assets/js/[name].bundle.js'
  },

  resolve: {
    alias: {
      'lodash-es': 'lodash',
    },
  },

  module: {
    rules: [

      {
        test: /\.js$/,
        include: /src/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            plugins: [
              "@babel/plugin-transform-spread", 
              "@babel/plugin-proposal-class-properties",
              "lodash"
            ],
            presets: [
              [
                '@babel/preset-env',
                {
                  targets: {
                    node: 'current'
                  }
                }
              ],
            ]
          }
        }
      },
      {
        test: /\.html$/,
        use: ['html-loader']
      },
      {
        test: /\.s?css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: './assets/media/'
            }
          }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader']
      }

    ]
  },

  plugins: [
    new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: ['dist']}),
    new HtmlWebpackPlugin({template: 'index.html'}),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],

  devServer: {
    contentBase: path.resolve(__dirname, "./dist/assets/media"),
    compress: true,
    port: 2000,
    stats: 'errors-only',
    open: true
  },

  devtool: 'inline-source-map',

  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: false,
    }), new OptimizeCSSAssetsPlugin()],
  },
};

module.exports = config;
