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
import Login from './login/Login';
import WebGl from './WebGl';
import Util from './Util';
import About from './About';
import SpinCpm from './SpinCpm';
import PreLoading from './PreLoading/PreLoading';
import TestCtl from './TestCtl';
import NotFound from './NotFound';



// import asyncComponent from '../components/asyncComponent';
// const LazyImgCtl = asyncComponent(() => import('./LazyImgCtl').then(module => module.default));

import rem from '../components/SetRem';
import maxWidth from '../components/SetMaxWidth';
import ErrorCatch from '../components/ErrorCatch';

@ErrorCatch
@maxWidth
@rem
export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    console.log('init App2');
  }

  static contextTypes = {
    router: PropTypes.object.isRequired
  }

  componentDidMount() {

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
          <Route path="/about" component={About} />
          <Route path="/lazyimg" component={LazyImgCtl} />
          <Route path="/slideimg" component={SlideImgCtl} />
          <Route path="/webgl" component={WebGl} />
          <Route path="/util" component={Util} />
          <Route path="/login" component={Login} />
          <Route path="/spin" component={SpinCpm} /> 
          <Route path="/preloading" component={PreLoading} />
          <Route path="/test" component={TestCtl} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

// App.contextTypes = {
//   router: PropTypes.object.isRequired
// };
