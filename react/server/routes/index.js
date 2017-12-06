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
  let $html = render(renderToString(
      (
        <Provider store={store}>
          <Router context={{}} location={ctx.url}>
              <App2/>
          </Router>
        </Provider>
      )
  ));
  ctx.body = $html;
});

function render(html) {
  return `
  <!DOCTYPE html>
  <html style="font-size:20px">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
      <title>My App</title>
    <link href="/static/cChunkJs/styles.css?edad411b28a5b3c28c97" rel="stylesheet"></head>
    <body>
      <div id="app">${html}</div>
    <script crossorigin="anonymous" type="text/javascript" src="/static/cChunkJs/main.js?edad411b28a5b3c28c97"></script></body>
  </html>`;
}

module.exports = router;
