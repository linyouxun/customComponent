/**
 * index.js
 *
 * (C) 2017 mobile.de GmbH
 *
 * @author <a href="mailto:pahund@team.mobile.de">Patrick Hund</a>
 * @since 09 Feb 2017
 */
/* eslint-disable no-console */

import express from 'express';
import React from 'react';
import App2 from '../modules/controllers/App2';
import Error from '../modules/controllers/Error';
import { StaticRouter as Router } from 'react-router';
import { renderToString } from 'react-dom/server';

function render(html) {
  return `
  <!DOCTYPE html>
  <html style="font-size:20px">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=0">
      <title>My App</title>
    </head>
    <body>
      <div id="app">${html}</div>
      <script type="text/javascript" src="http://192.168.10.10:8081/main.js"></script>
    </body>
  </html>`;
}

const app = express();
app.get('*', (req, res) => {
  res.status(200).send(render(renderToString(
      (
          <Router context={{}} location={req.url}>
              <App2/>
          </Router>
      )
  )));
});

app.listen(3000, () => console.log('Demo app listening on port 3000'));
