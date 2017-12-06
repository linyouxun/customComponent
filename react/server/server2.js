var Koa = require('koa'),
    app = new Koa();
var middlewareInitFn = require('./middleware');

middlewareInitFn(app);

app.listen(3000, (error) => {
  if (error) {
    console.log('start error');
  } else {
    console.log('start http://localhost:3000');
    // c.exec('start http://192.168.10.10:3000');
  }
});
