import React from 'react'
import { render } from 'react-dom'
// import routes from './routes/index';
// import Error from './controllers/Error';
import App from './controllers/App2'
// hashHistory browserHistory useRouterHistory
import {BrowserRouter as Router, hashHistory} from 'react-router-dom' // BrowserRouter HashRouter
// import {createHistory} from 'history';
// const history = useRouterHistory(createHistory)({basename: ''});
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import ReduxApp from './redux/index'
let store = createStore(ReduxApp)
render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('app')
)

// // match({ hashHistory, routes }, (error, redirectLocation, renderProps) => {
// //   // const { location } = renderProps;
// //   if (error) {
// //     render(
// //       <Error/>,
// //       document.getElementById('app')
// //     );
// //   } else {
// //     render(
// //       <Router history={hashHistory} {...renderProps}/>,
// //       document.getElementById('app')
// //     );
// //   }
// // });
