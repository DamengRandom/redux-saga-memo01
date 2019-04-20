import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose
} from 'redux';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';
import { loadState, saveState } from './localStorage';
import { todo, status } from '../reducers';
import { rootSaga } from '../sagas';

const presistState = fromJS(loadState()); // initialised fromat need to be immutable object !!!
// console.log('load state data ', presistState);
// loadState(); // default load data from local storage !!
const reducers = combineReducers({
  todo,
  status,
});
const reduxDevTool = window.__REDUX_DEVTOOLS_EXTENSION__ &&
  window.__REDUX_DEVTOOLS_EXTENSION__();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  presistState, // load state data from redux store
  compose(applyMiddleware(sagaMiddleware), reduxDevTool)
);

store.subscribe(() => {
  saveState(store.getState()); // save state into reux store
});

sagaMiddleware.run(rootSaga);
export default store;
