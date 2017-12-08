let request = require('../request');
let router = require('koa-router')();

router.get('/', async (ctx, next) => {
  let data = await request('http://guangzhou.yoju360.com/api/location');
  ctx.type = 'json';
  ctx.body = data
});

module.exports = router;
