// hotMiddleware.js

const webpackHot = require('webpack-hot-middleware'),
  PassThrough = require('stream').PassThrough,
  hotMiddleware = (compiler, opts) => {
    const middleware = webpackHot(compiler, opts);
    return async (ctx, next) => {
      let stream = new PassThrough();
      ctx.body = stream;
      await middleware(ctx.req, {
        write: stream.write.bind(stream),
        writeHead: (status, headers) => {
          ctx.status = status;
          ctx.set(headers);
        }
      }, next);
    };
  };
module.exports = hotMiddleware;
