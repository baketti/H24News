const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTagsPlugin = require('html-webpack-tags-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './src/js/App.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 8080,
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      { 
        test: /\.css$/, 
        use: ["style-loader", "css-loader"] 
      },
      {
        test: /\.(scss)$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')
                ]
              }
            }
          },
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      favicon:'./public/favicon.png',
      filename:'index.html',
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new HtmlWebpackTagsPlugin({
      metas: [
        {
          path: 'og-image.png',
          attributes: {
              property: 'og:image',
              content: "og-image.png"
          }
        },
        {
          attributes: {
              property: 'og:image:type',
              content: "image/png"
          }
        },
        {
          path: 'og-image.png',
          attributes: {
              property: 'twitter:image',
              content: "og-image.png"
          }
        },
        {
          attributes: {
              property: 'twitter:image:type',
              content: "image/png"
          }
        },
      ]
    }),
    new CopyPlugin({
      patterns: [
        { 
          from: path.resolve(__dirname,'public/og-image.png'), 
          to: "" 
        },
      ],
    }),
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserWebpackPlugin()
    ],
  },
  performance: { hints: false },
}