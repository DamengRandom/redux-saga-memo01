import React from 'react';
import { connect } from 'react-redux';
import { READ_TODOS_REQUEST } from '../../constants';
import { TodoItem } from './todoItem';

class TodoList extends React.Component {
  componentDidMount() {
    this.props.onRequestTodos();
    // this.props.onRequestStatus();
  }
  render() {
    return (
      <React.Fragment>
        <h6>Todos</h6>
        {
          this.props.fetching ?
            <p>Loading</p> :
            this.props.todos.map(
              (data, index) =>
                <TodoItem key={`${data}-${index}`} {...data} />
            )
        }
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log('state returned', state);
  return {
    fetching: state.todo.fetching,
    error: state.todo.error,
    todos: state.todo.todos,
    // status: state.status.status,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRequestTodos: () => dispatch({ type: READ_TODOS_REQUEST }),
    // onRequestStatus: () => dispatch({ type: READ_STATUS_REQUEST })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
