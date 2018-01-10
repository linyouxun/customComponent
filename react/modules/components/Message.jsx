import React from 'react';
import cls from 'classnames';
import './Message.scss';
import ReactDOM from 'react-dom';

class Message extends React.Component {
  render() {
    let {text, className} = this.props;
    return (
      <div className={cls('message', { className: !!className })}>
        <div className='text'>
          {text}
        </div>
      </div>
    );
  }
}

export default Message;

/**
 * 卸载函数
 * @param node
 */
function closeFunc(node) {
  ReactDOM.unmountComponentAtNode(node);
  document.body.removeChild(node);
}

export let $prompt = (text, timeout = 2500) => {
  let c = React.createElement(Message, {text});
  let node = document.createElement('div');
  document.body.appendChild(node);
  ReactDOM.render(c, node);
  let timer = setTimeout(_ => closeFunc(node), timeout);
  return _ => {
    clearTimeout(timer);
    closeFunc(node);
  };
};
