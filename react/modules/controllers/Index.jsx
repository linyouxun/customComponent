import React from 'react';
import {Link} from 'react-router-dom';
import AddTodo from './AddTodo';
import AddTodo2 from './AddTodo2';

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = '';
    this.state = {
      text: ''
    }
    this.refBind.bind(this);
  }
  componentDidMount() {
    console.log("log---sss---2");
  }

  refBind(ref) {
    console.log('this is ref');
    console.log(ref);
  }

  changeData(event) {
    console.log(event);
    this.setState({
      text: event.target.value
    })
  }

  render() {
    let {text} = this.state;
    return (
      <div>
        <ul>
          <li><Link to="/index">index</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/lazyimg">lazyimg</Link></li>
          <li><Link to="/slideimg">slideimg</Link></li>
          <li><Link to="/lazyimg">lazyimg</Link></li>
          <li><Link to="/webgl">webgl</Link></li>
        </ul>
        Index2
        <AddTodo/>
        <AddTodo2/>
        <hr/>
        test ref
        <input 
          ref={this.refBind}
          onChange={this.changeData.bind(this)}
          value={text}
          />
      </div>
    );
  }
}
