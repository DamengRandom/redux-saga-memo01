import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import {
  CREATE_TODO_REQUEST,
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
            value={this.state.currentTodo}
            onChange={
              (event) => this.handleValueChange(event)
            } />
          <button
            type="submit"
            onClick={ (event) => {
              const todoObject = {
                task: this.state.currentTodo,
                toggle: false
              };
              event.preventDefault();
              this.props.onRequestToCreateTodo(todoObject);
              setTimeout(
                () => this.setState({ currentTodo: '' }), 0);
            }}
            disabled={this.state.currentTodo.length === 0}>
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
    onRequestToCreateTodo: todo =>
      dispatch({ type: CREATE_TODO_REQUEST, payload: todo }),
  }
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(withConnect)(CreateTodo);
