import React from 'react';
import "./webGl.scss";

export default class WebGl extends React.Component {
  componentDidMount() {
    console.log('WebGl');
  }

  render() {
    return (
      <div>
        <canvas id="glcanvas" width="640" height="480">
          Your browser doesn't appear to support the HTML5 <code>&lt;canvas&gt;</code> element.
        </canvas>
      </div>
    );
  }
}
