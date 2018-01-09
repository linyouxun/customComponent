let fs = require('fs'),
  path = require('path'),
  ExtractTextPlugin = require("extract-text-webpack-plugin"),
  webpack = require('webpack');
module.exports = {
  entry: path.resolve(__dirname, './server/server2.js'),
  output: {
    path: path.resolve(__dirname, 'static/sChunkJs'),
    filename: '[name].js',
    publicPath: '/',
    chunkFilename: '[id].chunk.js'
    // chunkFilename: '/statics/chunkJs/[name].server.[chunkhash:5].chunk.js',
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons'
  ]).reduce(function(ext, mod) {
    ext[mod] = 'commonjs ' + mod;
    return ext;
  }, {}),

  node: {
    __filename: true,
    __dirname: true
  },

  resolve: {
    extensions: [".js", ".jsx", "css", "less", "scss", "png", "jpg"]
  },

  devtool: 'source-map',

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
    // new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    // new webpack.optimize.CommonsChunkPlugin()
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
};
