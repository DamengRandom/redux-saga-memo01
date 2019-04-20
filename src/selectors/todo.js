import { createSelector } from 'reselect';
import store from '../store';

const selectTodo = state => state.get(store.getState().todo);

console.log('selectTodo', selectTodo);

export const makeSelectTodos = () => createSelector(
  selectTodo,
  subState => subState.get('todos')
)