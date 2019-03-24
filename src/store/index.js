import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { todo, status } from '../reducers';
import { rootSaga } from '../sagas';

const reducers = combineReducers({
  todo,
  status,
});
const reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  compose(applyMiddleware(sagaMiddleware), reduxDevTool)
);

sagaMiddleware.run(rootSaga);
export default store;
