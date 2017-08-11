import React, {PropTypes} from 'react';
import {Switch, Route} from 'react-router-dom';
import Index from './Index';
// import About from './About';
import NotFound from './NotFound';
import './app.css';

import About from 'bundle-loader?lazy&name=[id]!./About';//
import Bundle from './Bundle';

const AAbout = (props) => (
  <Bundle load={About}>
    {(Container) => <Container {...props}/>}
  </Bundle>
);
export default class App extends React.Component {
  componentDidMount() {
  }
  goBack() {
    let {router} = this.context;
    router.history.goBack();
  }
  render() {
    return (
      <div>
        <div onClick={this.goBack.bind(this)}>
          goBack
        </div>
        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/index" component={Index} />
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
