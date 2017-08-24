var path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require("extract-text-webpack-plugin");
//     ExtractTextPlugin = require('extract-text-webpack-plugin'),
//     autoprefixer = require('autoprefixer');

module.exports = {
  entry: path.resolve(__dirname, './modules/index.jsx'),
  output: {
    path: path.resolve(__dirname, 'static/cChunkJs'),
    filename: '[name].js',
    publicPath: '/static/cChunkJs',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    extensions: [".js", ".jsx", "css", "less", "scss", "png", "jpg"]
  },
  externals: {
    'react': 'window.React',
    'react-dom': 'window.ReactDOM'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true
    // progress: true// 报错无法识别，删除后也能正常刷新
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0'
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          // resolve-url-loader may be chained before sass-loader if necessary
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'My App',
    template: path.resolve(__dirname, './modules/index.html'),
    filename: 'index.html',
    inject: true,
    hash: true
  }), new ExtractTextPlugin("styles.css")]
};
