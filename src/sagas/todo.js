import { takeLatest, put, call, fork, all } from 'redux-saga/effects';
import { createTodo, readTodos } from '../apis';
import {
  CREATE_TODO_REQUEST,
  READ_TODOS_REQUEST,
  // UPDATE_TODO_REQUEST,
  // DELETE_TODO_REQUEST,
  CREATE_TODO_SUCCESS,
  READ_TODOS_SUCCESS,
  // UPDATE_TODO_SUCCESS,
  // DELETE_TODO_SUCCESS,
  CREATE_TODO_FAILURE,
  READ_TODOS_FAILURE,
  // UPDATE_TODO_FAILURE,
  // DELETE_TODO_FAILURE,
} from '../constants';

// create todos watcher + worker sagas
export function* createTodoWatcherSaga() {
  yield takeLatest(CREATE_TODO_REQUEST, createTodoWorkerSaga);
}

function* createTodoWorkerSaga(action) {
  try {
    const response = yield call(createTodo, action.payload);
    const todo = response.data;
    console.log('new todo', todo);
    yield put({ type: CREATE_TODO_SUCCESS, payload: response });
    // yield put({ type: CREATE_TODO_SUCCESS, todo });
    console.log('after action');
    const newResponse = yield call(readTodos);
    const todos = newResponse.data;
    // console.log(todos);
    yield put({ type: READ_TODOS_SUCCESS, todos });
  }catch(error) {
    console.log(error);
    yield put({ type: CREATE_TODO_FAILURE, error });
  }
}

// read todos watcher + worker sagas
export function* readTodosWatcherSaga() {
  yield takeLatest(READ_TODOS_REQUEST, readTodosWorkerSaga);
}

function* readTodosWorkerSaga() {
  try {
    const response = yield call(readTodos);
    const todos = response.data;
    // console.log(todos);
    yield put({ type: READ_TODOS_SUCCESS, todos });
  }catch(error) {
    yield put({ type: READ_TODOS_FAILURE, error });
  }
}

// root saga
export function* rootSaga() {
  yield all([
    readTodosWatcherSaga(),
    createTodoWatcherSaga(),
    // fork(createTodoWatcherSaga),
    // fork(readTodosWatcherSaga)
  ]);
}
