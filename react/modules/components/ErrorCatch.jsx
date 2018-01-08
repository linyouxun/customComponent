import React from 'react';
import PropTypes from 'prop-types';

export default (Component) => class  extends React.Component {
    constructor(props) {
      super(props);
      this.state = { hasError: false };
    }

    componentDidCatch(error, info) {
    }

    componentDidMount() {
      window.onerror = (e) => {
        console.log('捕获js异常 componentDidMount');
        console.log(e);
        console.log(window.location.href);
      }
    }

    render() {
      return <Component {...this.props}></Component>;
    }

}
