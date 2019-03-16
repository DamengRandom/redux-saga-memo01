import { takeLatest, put, call, all } from 'redux-saga/effects';
import { createTodo, readTodos, updateTodo, deleteTodo } from '../apis';
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

// create todos watcher + worker sagas
export function* createTodoWatcherSaga() {
  yield takeLatest(CREATE_TODO_REQUEST, createTodoWorkerSaga);
}

function* createTodoWorkerSaga(action) {
  try {
    const response = yield call(createTodo, action.payload);
    yield put({ type: CREATE_TODO_SUCCESS, payload: response });
    const newResponse = yield call(readTodos);
    const todos = newResponse.data;
    yield put({ type: READ_TODOS_SUCCESS, todos });
  }catch(error) {
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
    yield put({ type: READ_TODOS_SUCCESS, todos });
  }catch(error) {
    yield put({ type: READ_TODOS_FAILURE, error });
  }
}

// update todo watcher + worker sagas
export function* updateTodosWatcherSaga() {
  yield takeLatest(UPDATE_TODO_REQUEST, updateTodosWorkerSaga);
}

function* updateTodosWorkerSaga(action) {
  try {
    const response = yield call(updateTodo, action.payload);
    const todo = response.data;
    yield put({ type: UPDATE_TODO_SUCCESS, payload: todo });
  }catch(error) {
    yield put({ type: UPDATE_TODO_FAILURE, error });
  }
}

// delete todo watcher + worker sagas
export function* deleteTodosWatcherSaga() {
  yield takeLatest(DELETE_TODO_REQUEST, deleteTodosWorkerSaga);
}

function* deleteTodosWorkerSaga(action) {
  try {
    yield call(deleteTodo, action.id);
    yield put({ type: DELETE_TODO_SUCCESS, id: action.id });
    console.log('here?1 ');
    // const newResponse = yield call(readTodos);
    // const todos = newResponse.data;
    // console.log('after delete new todos ', todos);
    // yield put({ type: READ_TODOS_SUCCESS, todos });
  }catch(error) {
    yield put({ type: DELETE_TODO_FAILURE, error });
  }
}

// root saga
export function* rootSaga() {
  yield all([
    readTodosWatcherSaga(),
    createTodoWatcherSaga(),
    updateTodosWatcherSaga(),
    deleteTodosWatcherSaga()
  ]);
}
