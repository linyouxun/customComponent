import React from 'react';
import {Link} from 'react-router-dom';

export default class Index extends React.Component {
  render() {
    return (
      <div>
        <ul>
          <li><Link to="/index">index</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
        Index2
      </div>
    );
  }
}