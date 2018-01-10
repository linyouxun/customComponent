let path = require('path')
// let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextPlugin = require('extract-text-webpack-plugin')
let ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin')
let isDev = process.env.NODE_ENV !== 'production'
let noop = () => {}
let webpack = require('webpack')
let UglifyJSPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  // entry: ['babel-polyfill', path.resolve(__dirname, './modules/index.jsx')],
  entry: {
    common: ['babel-polyfill', 'react', 'react-dom', 'prop-types'],
    index: path.resolve(__dirname, './modules/index.jsx')
  },
  output: {
    path: path.resolve(__dirname, 'static/cChunkJs'),
    filename: '[name].js',
    publicPath: '/static/cChunkJs',
    chunkFilename: '[name].[id].chunk.js'
  },
  resolve: {
    extensions: ['.js', '.jsx', 'css', 'less', 'scss', 'png', 'jpg']
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true
    // progress: true// 报错无法识别，删除后也能正常刷新
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
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
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': isDev ? JSON.stringify('dev') : JSON.stringify('production')
      }
    }),
    // new HtmlWebpackPlugin({
    //   title: 'My App',
    //   template: path.resolve(__dirname, './modules/index.html'),
    //   filename: 'index.html',
    //   inject: true,
    //   hash: true
    // }),
    // new webpack.LoaderOptionsPlugin({
    //   options: {
    //     postcss: function () {
    //       return ['autoprefixer'];
    //     },
    //     // devServer: {
    //     //   contentBase: './public', //本地服务器所加载的页面所在的目录
    //     //   colors: true, //终端中输出结果为彩色
    //     //   historyApiFallback: true, //不跳转
    //     //   inline: true //实时刷新
    //     // }
    //   }
    // }),
    new ExtractTextPlugin('styles.css'),
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
    isDev ? noop : new UglifyJSPlugin()
  ]
}
