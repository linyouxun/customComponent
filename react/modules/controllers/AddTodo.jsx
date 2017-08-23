import React from 'react';
import { connect } from 'react-redux';

class AddTodo extends React.Component {
  render() {
    let {text} = this.props;
    return (
      <div>
        AddTodo
        <br/>
        {'text: ' + text}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    text: state.todos.text
  };
};

export default connect(
  mapStateToProps
)(AddTodo);
