import React from 'react';
import './SetMaxWidth.scss';

export default (Component) => class extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return <Component {...this.props} />;
  }
};
