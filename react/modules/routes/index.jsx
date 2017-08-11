// import React from 'react';
// import {Router, Route, browserHistory, IndexRoute} from "react-router";
// browserHistory  hashHistory
// import {Router, Route, IndexRedirect, useRouterHistory, Redirect,IndexRoute} from 'react-router';
// import {createHistory} from 'history';
// const history = useRouterHistory(createHistory)({basename: ''});

// Hook for server
if (typeof require.ensure !== 'function') {
  require.ensure = function(dependencies, callback) {
    callback(require);
  };
}

const routes = [
  {
    path: "/",
    getComponents(location, callback) {
      require.ensure([], function(require) {
        callback(null, require('../controllers/App').default);
      });
    },
    indexRoute: {
      getComponents(location, callback) {
        require.ensure([], function(require) {
          callback(null, require('../controllers/Index').default);
        });
      }
    },
    childRoutes: [{
      path: "about",
      getComponents(location, callback) {
        require.ensure([], function(require) {
          callback(null, require('../controllers/About').default);
        });
      }
    }]
  },
  {
    path: "*",
    getComponents(location, callback) {
      require.ensure([], function(require) {
        callback(null, require('../controllers/NotFound').default);
      });
    }
  }
];
module.exports = routes;
