/* eslint-disable no-case-declarations, no-param-reassign */
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { LOGOUT } from '../App/constants';

// The initial state of the App
const TIME_OUT = 6000;
export const initialState = fromJS({
  open: false,
  message: null,
  timeout: TIME_OUT
});

const snackbars = handleActions(
  {
    [LOGOUT]: () => initialState
  },
  initialState
);

export default snackbars;
/* eslint-enable no-case-declarations, no-param-reassign */
