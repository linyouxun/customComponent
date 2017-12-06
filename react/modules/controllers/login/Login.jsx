import React from 'react';
import './Login.scss';
export default class Login extends React.Component {
  render() {
    return (
      <div className='login'>
        <div className='l-form'>
          <div className='l-item'>
            <input name='name' type="text" placeholder='用户名'/>
          </div>
          <div className='l-item'>
            <input name='pwd' type="password" placeholder='密码'/>
          </div>
          <div className='l-item'>
            <button className='submit'>提交</button>
          </div>
        </div>
      </div>
    );
  }
}
