var Koa = require('koa');
var app = new Koa();
var middlewareInitFn = require('./middleware');

middlewareInitFn(app);

app.listen(6002, (error) => {
  if (error) {
    console.log('start error');
  } else {
    console.log('start http://localhost:6002');
    // c.exec('start http://192.168.10.10:3000');
  }
});
