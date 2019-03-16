import React from 'react';
import { connect } from 'react-redux';
import { UPDATE_TODO_REQUEST } from '../../constants';

class UpdateTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      task: this.props.todo ? this.props.todo.task : '',
      toggle: this.props.todo ? this.props.todo.toggle : ''
    };
  }

  handleInputChange = (e) => {
    this.setState({
      task: e.target.value,
    });
  }

  handleCheckboxChange = (e) => {
    this.setState({
      toggle: e.target.value,
    });
  }

  handleUpdate = (e) => {
    e.preventDefault();
    let updatedTodoObject = {
      id: this.props.todo.id,
      task: this.state.task,
      toggle: this.state.toggle
    }
    this.props.onRequestForTaskUpdate(updatedTodoObject);
    this.props.history.push('/');
  }
  render() {
    return (
      <form>
        <div>
          <label>Task</label>
          <input
            type="text"
            value={this.state.task}
            onChange={e => this.handleInputChange(e)}
          />
        </div>
        <div>
          <label>Toggle</label>
          <input
            type="checkbox"
            checked={this.state.toggle}
            onChange={e => this.handleCheckboxChange(e)} />
        </div>
        <button
          type="submit"
          onClick={this.handleUpdate}
          disabled={this.state.task.length === 0}>
          Update
        </button>
      </form>
    )
  }
};

const mapStateToProps = (state, props) => {
  return {
    fetching: state.todo.fetching,
    todo: Object.assign({}, state.todo.todos.filter(todo =>
      todo.id === parseInt(props.match.params.id))[0]),
    error: state.todo.error,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRequestForTaskUpdate:
      todo => dispatch({ type: UPDATE_TODO_REQUEST, payload: todo })
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateTodo);
