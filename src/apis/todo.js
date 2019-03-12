import axios from 'axios';
const baseURL = 'http://localhost:3333/todos';

export const readTodos = () =>
  axios({
    method: 'get',
    url: baseURL
  });

export const createTodo = (todo) =>
  axios.post(baseURL, todo);
