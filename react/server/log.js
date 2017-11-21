const log4js = require('log4js');
log4js.configure({
  appenders: {
    urlLog: {
      type: "dateFile",
      filename: './log/url',//您要写入日志文件的路径
      alwaysIncludePattern: true,//（默认为false） - 将模式包含在当前日志文件的名称以及备份中
      compress: true,//（默认为false） - 在滚动期间压缩备份文件（备份文件将具有.gz扩展名）
      pattern: "-yyyy-MM-dd.log",//（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
      encoding: 'utf-8',//default "utf-8"，文件的编码
    },
    errorLog: {
      type: "dateFile",
      filename: './log/error',//您要写入日志文件的路径
      alwaysIncludePattern: true,//（默认为false） - 将模式包含在当前日志文件的名称以及备份中
      compress: true,//（默认为false） - 在滚动期间压缩备份文件（备份文件将具有.gz扩展名）
      pattern: "-yyyy-MM-dd.log",//（可选，默认为.yyyy-MM-dd） - 用于确定何时滚动日志的模式。格式:.yyyy-MM-dd-hh:mm:ss.log
      encoding: 'utf-8',//default "utf-8"，文件的编码
    },
    console: { type: 'console' }
  },
  categories: {
    default: { appenders: ['urlLog'], level: 'info' },
    logError: { appenders: ['errorLog'], level: 'error' },
  },
  pm2: true,
  pm2InstanceVar: 'INSTANCE_ID'
});

module.exports = {
  logger: log4js.getLogger(),
  errorlogger: log4js.getLogger('logError')
}
