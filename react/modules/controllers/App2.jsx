import React from 'react';
import PropTypes from 'prop-types';
import {Switch, Route} from 'react-router-dom';
// components
import Header from '../components/Header';
// scss
import './app.scss';

// controllers
import Index from './Index';
import LazyImgCtl from './LazyImgCtl';
import SlideImgCtl from './SlideImgCtl';
import NotFound from './NotFound';

import asyncComponent from '../components/asyncComponent';

// const LazyImgCtl = asyncComponent(() => import('./LazyImgCtl').then(module => module.default));

export default class App extends React.Component {
  constructor(props) {
    super(props);
    console.log('init App2');
  }
  componentDidMount() {
    // require('./app.scss');
    // console.log('init BJ_REPORT');
    // let BJ_REPORT = require('badjs-report');
    // BJ_REPORT.init({
    //   id: 1,
    //   url:'/a'
    // });
    // //记录离线日志
    // BJ_REPORT.offlineLog("offlineLog");
  }
  goBack() {
    let {router} = this.context;
    router.history.goBack();
  }
  render() {
    return (
      <div>
        <Header leftButton={this.goBack.bind(this)} title="t"/>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/index" component={Index} />
          <Route path="/lazyimg" component={LazyImgCtl} />
          <Route path="/slideimg" component={SlideImgCtl} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
};
