import React from 'react';
import PropTypes from 'prop-types';
// scss
import './app.scss';

import AddTodo from './AddTodo';
import AddTodo2 from './AddTodo2';

export default class App extends React.Component {
  componentDidMount() {
  }
  addTodo() {
    console.log('addTodo click');
  }
  render() {
    return (
      <div>
        app
        <AddTodo/>
        <AddTodo2/>
      </div>
    );
  }
}
