import { fromJS } from 'immutable';
import {
  READ_STATUS_REQUEST,
  READ_STATUS_SUCCESS,
  READ_STATUS_FAILURE,
  DISABLE_BUTTON,
} from '../constants';

export const statusInitialState = fromJS({
  loading: false,
});

export const statusReducer = (state = statusInitialState, action) => {
  switch(action.type) {
    case READ_STATUS_SUCCESS:
    case READ_STATUS_FAILURE:
      return state.set('loading', false);
    case READ_STATUS_REQUEST:
      return state.set('loading', true);
    case DISABLE_BUTTON:
      return state.set('loading', action.loading);
    default:
      return state;
  }
};
