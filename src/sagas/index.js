import { all } from 'redux-saga/effects';
import {
  createTodoWatcherSaga,
  readTodosWatcherSaga,
  updateTodosWatcherSaga,
  deleteTodosWatcherSaga,
} from './todo';

export function* rootSaga() {
  yield all([
    createTodoWatcherSaga(),
    readTodosWatcherSaga(),
    updateTodosWatcherSaga(),
    deleteTodosWatcherSaga(),
  ]);
}
