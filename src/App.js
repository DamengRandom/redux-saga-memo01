import React, { Component } from 'react';
import TodoList from './containers/todo/todoList';
import CreateTodo from './containers/todo/createTodo';

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CreateTodo />
        <hr />
        <TodoList />
      </React.Fragment>
    );
  }
}

export default App;
