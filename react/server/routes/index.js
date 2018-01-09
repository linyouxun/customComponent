import React from 'react';
import App2 from '../../modules/controllers/App2';
import { StaticRouter as Router } from 'react-router'; // BrowserRouter  StaticRouter
import { renderToString } from 'react-dom/server';
// import App2 from '../../modules/controllers/AppRedux';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import ReduxApp from '../../modules/redux/index';
let store = createStore(ReduxApp);
let router = require('koa-router')();
router.get('a', (ctx, next) => {
  ctx.body = ctx.query;
});
router.post('a', (ctx, next) => {
  ctx.body = 'asdasdasd';
});
router.get('*', (ctx, next) => {
  let context = {};
  let $html = render(renderToString(
      (
        <Provider store={store}>
          <Router context={context} location={ctx.url}>
              <App2/>
          </Router>
        </Provider>
      )
  ));
  console.log('context log:');
  console.log(context)
  ctx.body = $html;
});

function render(html) {
  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
      <title>My App</title>
    <link href="/static/cChunkJs/styles.css?edad411b28a5b3c28c97" rel="stylesheet"></head>
    <body>
      <!--[if lt IE 9]>
          <style>
            #app{display:none!important;}
            .ie-noscript-warning {
              text-align: center;
            }
          </style>
          <div class="ie-noscript-warning">
            <h3 style="font-size: 36px">请升级浏览器</h3>
            <h4 style="font-size: 24px">不支持ie9以及ie9以下版本</h4>
          </div>
      <![endif]-->
      
      <div id="app">${html}</div>
      <script crossorigin="anonymous" type="text/javascript" src="/static/cChunkJs/common.js?edad411b28a5b3c28c97"></script></body>
      <script crossorigin="anonymous" type="text/javascript" src="/static/cChunkJs/index.js?edad411b28a5b3c28c97"></script></body>
  </html>`;
}

module.exports = router;
