import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';
import { LOGOUT } from '../App/constants';

// The initial state of the App
export const initialState = fromJS({});

const loginReducer = handleActions(
  {
    [LOGOUT]: () => initialState
  },
  initialState
);

export default loginReducer;
