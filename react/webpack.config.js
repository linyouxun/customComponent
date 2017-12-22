var path = require('path'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin'),
  isDev = process.env.NODE_ENV !== 'production',
  noop = new Function(),
  webpack = require("webpack");
//     ExtractTextPlugin = require('extract-text-webpack-plugin'),
//     autoprefixer = require('autoprefixer');

module.exports = {
  entry: ['babel-polyfill', path.resolve(__dirname, './modules/index.jsx')],
  output: {
    path: path.resolve(__dirname, 'static/cChunkJs'),
    filename: '[name].js',
    publicPath: '/static/cChunkJs',
    chunkFilename: '[name].[id].chunk.js'
  },
  resolve: {
    extensions: [".js", ".jsx", "css", "less", "scss", "png", "jpg"]
  },
  externals: {
    // 'react': 'window.React',
    // 'react-dom': 'window.ReactDOM'
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true
    // progress: true// 报错无法识别，删除后也能正常刷新
  },
  devtool: isDev ? 'source-map' : false,
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        // loader: 'babel-loader?presets[]=es2015&presets[]=react&presets[]=stage-0',
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react', 'stage-0'],
            plugins: ['syntax-dynamic-import', 'transform-decorators-legacy']
          }
        }
      }, {
        test: /\.css$/,
        loader: 'style-loader!css-loader'
      }, {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
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
  }), 
  new ExtractTextPlugin("styles.css"),
  new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'async',
    custom: [
      {
        test: /\.js$/,
        attribute: 'crossorigin',
        value: 'anonymous'
      }
    ]
  }),
  isDev ? noop : new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
		mangle: false,
    compress: {
      warnings: false,
      drop_console: false,
    }
  })]
};
