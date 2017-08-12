let fs = require('fs'),
  path = require('path'),
  webpack = require('webpack');
module.exports = {
  entry: path.resolve(__dirname, './server/server.js'),
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

  plugins: [
    // new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")
    // new webpack.optimize.CommonsChunkPlugin()
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
};
