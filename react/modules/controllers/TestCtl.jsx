import React from 'react';
import ArrayCpm from "../components/ArrayCpm";
import StringCpm from "../components/StringCpm";

export default class TestCtl extends React.Component {
  
  render() {
    return (
      <div>
        <ArrayCpm />
        <StringCpm />
      </div>
    );
  }
}
