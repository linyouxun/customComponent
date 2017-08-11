import React from 'react';
import { render } from 'react-dom';
// import routes from './routes/index';
// import Error from './controllers/Error';
import App from './controllers/App';
// hashHistory browserHistory useRouterHistory
import {HashRouter, hashHistory} from 'react-router-dom';
// import {createHistory} from 'history';
// const history = useRouterHistory(createHistory)({basename: ''});
render(
  <HashRouter history={hashHistory}>
    <App/>
  </HashRouter>,
  document.getElementById('app')
);

// match({ hashHistory, routes }, (error, redirectLocation, renderProps) => {
//   // const { location } = renderProps;
//   if (error) {
//     render(
//       <Error/>,
//       document.getElementById('app')
//     );
//   } else {
//     render(
//       <Router history={hashHistory} {...renderProps}/>,
//       document.getElementById('app')
//     );
//   }
// });
