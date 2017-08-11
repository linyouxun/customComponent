var path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin');
//     ExtractTextPlugin = require('extract-text-webpack-plugin'),
//     autoprefixer = require('autoprefixer');

module.exports = {
  entry: path.resolve(__dirname, './modules/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'static'),
    filename: '[name].js',
    publicPath: '/',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    extensions: [".js", ".jsx", "css", "less", "scss", "png", "jpg"]
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true
    // progress: true// 报错无法识别，删除后也能正常刷新
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader?sourceMap'
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'My App',
    template: path.resolve(__dirname, './modules/index.html'),
    filename: 'index.html',
    inject: true,
    hash: true
  })]
};
