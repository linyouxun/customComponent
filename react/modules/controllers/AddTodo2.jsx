import React from 'react';
import { connect } from 'react-redux';
import { addTodo } from '../redux/actions/todos';

class AddTodo2 extends React.Component {
  addTodo() {
    let {dispatch} = this.props;
    console.log('addTodo');
    dispatch(addTodo('nihao'));
  }
  render() {
    return (
      <div>
        <span onClick={this.addTodo.bind(this)}> click </span>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return state;
};

export default connect(
  mapStateToProps
)(AddTodo2);
