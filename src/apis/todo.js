import axios from 'axios';
const baseURL = 'http://localhost:3333/todos';

export const createTodo = todo =>
  axios.post(baseURL, todo);

export const readTodos = () =>
  axios({
    method: 'get',
    url: baseURL
  });

export const updateTodo = todo =>
  axios.put(`${baseURL}/${todo.id}`, todo);

export const deleteTodo = id =>
  axios.delete(`${baseURL}/${id}`);
