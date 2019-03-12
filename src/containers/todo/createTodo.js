import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  CREATE_TODO_REQUEST,
  // READ_TODOS_REQUEST
} from '../../constants';

class CreateTodo extends React.Component {
  state = {
    currentTodo: ''
  };

  handleValueChange = (event) => {
    this.setState({
      currentTodo: event.target.value
    });
  }

  render() {
    return (
      <React.Fragment>
        <h6>Create Todo</h6>
        <form>
          <input
            type="text"
            onChange={
              (event) => this.handleValueChange(event)
            } />
          <button
            type="button"
            onClick={async () => {
              // event.preventDefault();
              const todoObject = {
                task: this.state.currentTodo,
                toggle: false
              };
              await this.props.onRequestToCreateTodo(todoObject);
              // await this.props.onRequestTodos();
              // setTimeout(() => console.log(this.props), 1000);
            }}>
            Create
          </button>
        </form>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    todos: state.todo.todos
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRequestToCreateTodo: (todo) =>
      dispatch({ type: CREATE_TODO_REQUEST, payload: todo }),
    // onRequestTodos: () => dispatch({ type: READ_TODOS_REQUEST })
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CreateTodo);
