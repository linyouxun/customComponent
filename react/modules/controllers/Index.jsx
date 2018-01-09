import React from 'react';
import {Link} from 'react-router-dom';
import AddTodo from './AddTodo';
import AddTodo2 from './AddTodo2';
import {$prompt} from '../components/Message';

export default class Index extends React.Component {
// export class Index extends React.Component {
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
    $prompt(event.target.value);
    this.setState({
      text: event.target.value
    })
  }

  evalError(e) {
    eval("console.lot('ssss')");
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
          <li><Link to="/preloading">preloading</Link></li>
          <li><Link to="/spin">spin</Link></li>
          <li><Link to="/test">TestCtl</Link></li>
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
        <button onClick={this.evalError.bind()}>evalError</button>
      </div>
    );
  }
}

// export default rem(Index);
