import React from 'react';
import AddTodo from './AddTodo';
import ArrayCpm from "../components/ArrayCpm";
import StringCpm from "../components/StringCpm";

export default class TestCtl extends React.Component {
  
  render() {
    return (
      <div>
        <AddTodo/>
        <ArrayCpm />
        <StringCpm />
      </div>
    );
  }
}
