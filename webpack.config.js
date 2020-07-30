const path = require('path');
// const MyPlugin = require('./myplugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      templateParameters: {
        env: process.env.NODE_ENV === 'development' ? '(개발용)' : '',
      },
      minify:
        process.env.NODE_ENV === 'production'
          ? {
              collapseWhitespace: true,
              removeComments: true,
            }
          : false,
      hash: true,
    }),
    // (
    //     process.env.NODE_ENV === 'production' 
    //     ? [new MiniCssExtractPlugin({ filename: `[name].css` })] 
    //     : []
    // ),
    new MiniCssExtractPlugin({filename: `[name].css`}),
  ],
  mode: 'development',
  entry: {
    main: './src/app.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve('./dist'),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
            // process.env.NODE_ENV === 'production' 
            // ? MiniCssExtractPlugin.loader 
            // : 'style-loader',
            // 'css-loader'
            MiniCssExtractPlugin.loader, 'css-loader'
        ],
        // use: ['style-loader', 'css-loader'],
      },
      //   {
      //     test: /\.jpg$/,
      //     loader: 'file-loader',
      //     options: {
      //       publicPath: './dist/',
      //       name: '[name].[ext]?[hash]',
      //     },
      //   },
      {
        test: /\.jpg$/,
        use: {
          loader: 'url-loader',
          options: {
            publicPath: './dist/',
            name: '[name].[ext]?[hash]',
            limit: 5000, // 5kb 미만 파일만 data url로 처리
          },
        },
      },
    ],
  },
};
