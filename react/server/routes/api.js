let router = require('koa-router')();

router.post('/getUser', (ctx, next) => {
  ctx.type = 'json';
  ctx.body = {
    name: 'lyx',
    age: 25
  }
});

module.exports = router;