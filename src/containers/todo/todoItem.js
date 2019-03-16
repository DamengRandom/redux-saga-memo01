import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { DELETE_TODO_REQUEST } from '../../constants';

export const TodoItemWrapper = props => {
  const handleDelete = () => {
    props.onRequestForDeleteTodo(props.id);
  };

  return (
    <React.Fragment>
      <div>
        <Link to={`/update/${props.id}`}>
          {props.task}
        </Link>
        <button onClick={handleDelete}>X</button>
      </div>
    </React.Fragment>
  );
};

const mapStateToProps = state => {
  return {
    todos: state.todo.todos
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onRequestForDeleteTodo: 
      id => dispatch({ type: DELETE_TODO_REQUEST, id })
  }
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const TodoItem = compose(withConnect)(TodoItemWrapper);

export { TodoItem };
