import React, {PropTypes} from 'react';
import './header.scss';

export default class Header extends React.Component {
  render() {
    let {leftButton, rightButton, title} = this.props;
    return (
      <div>
        <div className="header fixed">
          <div className="nav-button left" onClick={leftButton}> &lt; </div>
          <div className="nav-title">{title}</div>
          <div className="nav-button right" onClick={rightButton}> &gt; </div>
        </div>
        <div className="header"></div>
      </div>
    );
  }
}

Header.defaultProps = {
  title: "",
  leftButton: () => {},
  rightButton: () => {}
};

Header.propTypes = {
  title: PropTypes.string,
  leftButton: PropTypes.func,
  rightButton: PropTypes.func
};
