import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import './Spin.scss';

function Loading(props) {
  return <span className='spin-load'>
    <i className={cls('s-l-circle', props.className)}></i>
    <i className={cls('s-l-circle', props.className)}></i>
    <i className={cls('s-l-circle', props.className)}></i>
    <i className={cls('s-l-circle', props.className)}></i>
  </span>;
}

export default class Spin extends React.Component {
  componentDidMount() {
  }
  render() {
    let {children, className} = this.props;
    return (
      <div className='cpm-spin'>
        {children}
        <span className='spin-load-msg'>
          <Loading className={className}/>
        </span>
      </div>
    );
  }
}

Spin.defaultProps = {
  msg: ''
};

Spin.propTypes = {
  msg: PropTypes.string
  // leftButton: PropTypes.func,
  // rightButton: PropTypes.func
};

export {
  Loading
};
