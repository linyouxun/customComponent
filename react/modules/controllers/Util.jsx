import React from 'react';
import util from '../tools/util';

export default class Util extends React.Component {
  state = {
    phone: ''
  }
  changePhone(e) {
    let {value} = e.target;
    this.setState({
      phone: value.replace(/\D/g,'')
    })
  }
  render() {
    let {phone} = this.state;
    return (
      <div>
        <input maxLength='13' type='text' value={util.transformPhone(phone)} onChange={this.changePhone.bind(this)}/>
        <span>{phone}</span>
      </div>
    );
  }
}
