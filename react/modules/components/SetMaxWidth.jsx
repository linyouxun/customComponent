import React, {Component} from 'react';
import './SetMaxWidth.scss';

export default (Component) => class extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <Component {...this.props}/>
  }
}
