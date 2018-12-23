const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')

const DIST = path.resolve(__dirname, 'dist')

module.exports = {
  entry: [
    './src/index.js',
    './static/css/index.css'
  ],
  output: {
    path: DIST,
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              minimize: true
            }
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename: 'app.css'}),
    new OptimizeCSSAssetsPlugin(),
    new CopyWebpackPlugin([
      {from: './template', to: DIST},
      {from: './static/img', to: DIST + '/img'}
    ])
  ],
  devServer: {
    port: 3000,
    compress: true,
    disableHostCheck: true
  }
}
