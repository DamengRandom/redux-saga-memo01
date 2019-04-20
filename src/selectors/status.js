import { createSelector } from 'reselect';
// import { statusInitialState } from '../reducers/status';
import store from '../store';
// console.log('statusInitialState', statusInitialState);
console.log('from store', store.getState().status);

export const selectStatus = () =>
  store.getState().status;

export const makeSelectLoadingStatus = () =>
  createSelector(
    selectStatus,
    subState => subState.get('loading'));
