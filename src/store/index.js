import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { todoReducer } from '../reducers';
import { rootSaga } from '../sagas';
// import { createTodoWatcherSaga } from '../sagas/todo';
// import { readTodosWatcherSaga } from '../sagas/todo';

const reducers = combineReducers({
  todo: todoReducer
});
const reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  compose(applyMiddleware(sagaMiddleware), reduxDevTool)
);

sagaMiddleware.run(rootSaga);
// sagaMiddleware.run(readTodosWatcherSaga);
// sagaMiddleware.run(createTodoWatcherSaga);

export default store;
