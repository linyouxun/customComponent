import React from 'react';

export default (Component) => class extends React.Component {
  // constructor() {
  //   super();
  // }

  componentDidMount() {
    (function(doc, win) {
      var _root = doc.documentElement;
      var resizeEvent = 'orientationchange' in window ? 'orientationchange' : 'resize';
      var resizeCallback = function() {
        var clientWidth = _root.clientWidth;
        var fontSize = 10;
        if (!clientWidth) return;
        // console.log(clientWidth)
        if (clientWidth < 750) {
          fontSize = 10 * (clientWidth / 375);
        } else {
          fontSize = 10 * (750 / 375);
        }
        _root.style.fontSize = fontSize + 'px';
      };
      if (!doc.addEventListener) return;
      win.addEventListener(resizeEvent, resizeCallback, false);
      doc.addEventListener('DOMContentLoaded', resizeCallback, false);
    })(document, window);
  }

  render() {
    return (
      <Component {...this.props}></Component>
    );
  }
};
