var path = require('path'),
    serve = require("koa-static"),
    bodyParser = require('koa-bodyparser'),
    router = require('koa-router')(),
    index = require('./routes/index'),
    api = require('./routes/api'),
    isDev = process.env.NODE_ENV !== 'production',
    log = require('./log'),
    c = require('child_process');
router.use('/api', api.routes());
router.use('/', index.routes());
let logger = log.logger;
let errorlogger = log.errorlogger;

module.exports = app => {
  //通用错误处理
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.body = `\r\n${err.message}\r\n` && `\r\n${err.message}\r\n${err.stack}\r\n` || `\r\n${err}\r\n`;
      ctx.status = err.status || 500;
      errorlogger.error(ctx.url,ctx.method,JSON.stringify(ctx.request.body),JSON.stringify(ctx.query),ctx.status,ctx.protocol,ctx.ip,ctx.headers['user-agent'],ctx.headers['host'],`\r\n${err.message}\r\n` && `\r\n${err.message}\r\n${err.stack}\r\n` || `\r\n${err}\r\n`);
    }
  });
  app.use(serve(path.resolve(__dirname, '../'), { extensions: ['html', 'js', 'css']}));
  app.use(bodyParser());
  app.use(async (ctx,next) => {
      await next();
      logger.info(ctx.url,ctx.method,JSON.stringify(ctx.request.body),JSON.stringify(ctx.query),ctx.status,ctx.protocol,ctx.ip,ctx.headers['user-agent'],ctx.headers['host']);
  });
  app.use(router.routes());
  app.use(router.allowedMethods());
}
