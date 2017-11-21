let router = require('koa-router')();

router.get('/getUser', (ctx, next) => {
  ctx.type = 'json';
  ctx.body = {
    name: 'lyx',
    age: 25
  }
});

module.exports = router;
