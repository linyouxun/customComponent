import React from 'react';

export default class NotFound extends React.Component {
  state = {
    name: 'NotFound'
  }
  render() {
    return (
      <div>
        {this.state.name}
      </div>
    );
  }
}
