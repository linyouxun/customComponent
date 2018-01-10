var path = require('path');
var serve = require('koa-static');
var bodyParser = require('koa-bodyparser');
var router = require('koa-router')();
var index = require('./routes/index');
var api = require('./routes/api');
// var isDev = process.env.NODE_ENV !== 'production';
var log = require('./log');
// var c = require('child_process');
router.use('/api', api.routes());
router.use('/', index.routes());
let logger = log.logger;
let errorlogger = log.errorlogger;

module.exports = app => {
  // 通用错误处理
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.body = (`\r\n${err.message}\r\n` && `\r\n${err.message}\r\n${err.stack}\r\n`) || `\r\n${err}\r\n`;
      ctx.status = err.status || 500;
      errorlogger.error(ctx.url, ctx.method, JSON.stringify(ctx.request.body), JSON.stringify(ctx.query), ctx.status, ctx.protocol, ctx.ip, ctx.headers['user-agent'], ctx.headers['host'], (`\r\n${err.message}\r\n` && `\r\n${err.message}\r\n${err.stack}\r\n`) || `\r\n${err}\r\n`);
    }
  });
  app.use(serve(path.resolve(__dirname, '../'), {extensions: ['html', 'js', 'css']}));
  app.use(bodyParser());
  app.use(async (ctx, next) => {
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx.set('X-Response-Time', `${ms}ms`);
    logger.info(ctx.url, ctx.method, JSON.stringify(ctx.request.body), JSON.stringify(ctx.query), ctx.status, ctx.protocol, ctx.ip, ctx.headers['user-agent'], ctx.headers['host']);
  });
  app.use(router.routes());
  app.use(router.allowedMethods());
};
