import {
  CREATE_TODO_REQUEST,
  READ_TODOS_REQUEST,
  UPDATE_TODO_REQUEST,
  DELETE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  READ_TODOS_SUCCESS,
  UPDATE_TODO_SUCCESS,
  DELETE_TODO_SUCCESS,
  CREATE_TODO_FAILURE,
  READ_TODOS_FAILURE,
  UPDATE_TODO_FAILURE,
  DELETE_TODO_FAILURE,
} from '../constants';

const initialState = {
  fetching: false,
  todos: [],
  error: null
};

export const todoReducer = (state = initialState, action) => {
  switch(action.type) {
    case CREATE_TODO_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case CREATE_TODO_SUCCESS:
      return {
        ...state,
        fetching: false,
        todos: [action.payload].concat(state.todos),
        error: null
      };
    case CREATE_TODO_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    case READ_TODOS_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case READ_TODOS_SUCCESS:
      return {
        ...state,
        fetching: false,
        todos: action.todos,
        error: null
      };
    case READ_TODOS_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    case UPDATE_TODO_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case UPDATE_TODO_SUCCESS:
      return {
        ...state,
        fetching: false,
        todos: state.todos.map(todo =>
          todo.id === action.payload.id ?
          action.payload : todo),
        error: null
      };
    case UPDATE_TODO_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    case DELETE_TODO_REQUEST:
      return {
        ...state,
        fetching: true,
        error: null
      };
    case DELETE_TODO_SUCCESS:
      return {
        ...state,
        fetching: false,
        todos: state.todos.filter(todo =>
          todo.id !== action.id),
        error: null
      };
    case DELETE_TODO_FAILURE:
      return {
        ...state,
        fetching: false,
        error: action.error
      };
    default: 
      return state; 
  }
}
