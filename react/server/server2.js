var Koa = require('koa'),
  path = require('path'),
  serve = require("koa-static"),
  bodyParser = require('koa-bodyparser'),
  router = require('koa-router')(),
  index = require('./routes/index'),
  app = new Koa(),
  webpack = require('webpack'),
  webpackConfig = require('../webpack.config'),
  compiler = webpack(webpackConfig),
  isDev = process.env.NODE_ENV !== 'production',
  c = require('child_process');
// 是否是dev环境，是 webpack实时更新
if (isDev) {
  app.use(require("./devMiddleware")(compiler, {
    noInfo: true, publicPath: webpackConfig.output.publicPath
  }));
}
app.use(serve(path.resolve(__dirname, '..')));
app.use(bodyParser());
router.use('/', index.routes());
app.use(router.routes());
app.listen(3000, (error) => {
  if (error) {
    console.log('start error');
  } else {
    console.log('start http://192.168.10.10:3000');
    c.exec('start http://192.168.10.10:3000');
  }
});
