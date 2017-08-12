import React, {PropTypes} from 'react';
import {Switch, Route} from 'react-router-dom';
// components
import Header from '../components/Header';
// scss
// import './app.scss';
// controllers
import Index from './Index';
import LazyImgCtl from './LazyImgCtl';
import SlideImgCtl from './SlideImgCtl';
import NotFound from './NotFound';
// 按需加载
import About from 'bundle-loader?lazy&name=[id]!./About';//
import Bundle from './Bundle';

const AAbout = (props) => (
  <Bundle load={About}>
    {(Container) => <Container {...props}/>}
  </Bundle>
);
export default class App extends React.Component {
  componentDidMount() {
    require('./app.scss');
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
          <Route path="/about" component={AAbout} />
          <Route component={NotFound} />
        </Switch>
      </div>
    );
  }
}

App.contextTypes = {
  router: PropTypes.object.isRequired
};
