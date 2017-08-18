import React from 'react';
import App2 from '../../modules/controllers/App2';
import { StaticRouter as Router } from 'react-router';
import { renderToString } from 'react-dom/server';
var router = require('koa-router')();

router.get('a', (ctx, next) => {
  ctx.body = {a: 'a'};
});
router.get('/', (ctx, next) => {
  let $html = render(renderToString(
      (
          <Router context={{}} location={ctx.url}>
              <App2/>
          </Router>
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
      <script src="https://cdn.bootcss.com/react/15.6.1/react.min.js"></script>
      <script src="https://cdn.bootcss.com/react/15.6.1/react-dom.min.js"></script>
    <link href="/static/cChunkJs/styles.css?edad411b28a5b3c28c97" rel="stylesheet"></head>
    <body>
      <div id="app">${html}</div>
    <script type="text/javascript" src="/static/cChunkJs/main.js?edad411b28a5b3c28c97"></script></body>
  </html>`;
}

module.exports = router;
