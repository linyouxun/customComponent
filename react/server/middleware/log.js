const log4js = require('log4js'),
      moment = require('moment'),
      path = require('path');

// node 日志
log4js.configure({
  appenders: { 
    reacterror: {
      type: 'datefile', 
      filename: "../logs/log_date/date",
      maxLogSize: 104857500,
      pattern: "-yyyy-MM-dd-hh.log"
    },
  },
  categories: { 
    default: { 
      appenders: ['reacterror'], level: 'error' 
    } 
  }
});
const reacterror = log4js.getLogger('reacterror');
// const reactlog = log4js.getLogger('reactlog');

let logMiddleware = async (ctx, next) => {
  try {
    await next();
    // reactlog.log(ctx.url)
  } catch (err) {
    reacterror.error(`${ctx.url}\r\n` + (err.message && `${err.message}\r\n${err.stack}` || err));
    ctx.redirect('/notFound');
  }
};

module.exports = logMiddleware;
