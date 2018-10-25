/* eslint-disable no-case-declarations, no-param-reassign */
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTION_SUCCESS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
  WITHDRAW_MODAL_OPEN,
  WITHDRAW_MODAL_CLOSE
} from './constants';

import { LOGOUT } from '../App/constants';

// The initial state of the App
export const initialState = fromJS({
  transactions: {
    loading: false,
    error: false,
    list: [],
    entities: {}
  },
  withdrawModal: {
    open: false,
    coin: null
  }
});

const walletReducer = handleActions(
  {
    [LOAD_TRANSACTIONS]: state =>
      state
        .setIn(['transactions', 'loading'], true)
        .setIn(['transactions', 'error'], false),

    [LOAD_TRANSACTION_SUCCESS]: (state, { payload }) => {
      let list = state.getIn(['transactions', 'list']);
      let entities = state.getIn(['transactions', 'entities']);
      const { transaction } = payload;
      for (let i = 0; i < transaction.length; i += 1) {
        const t = transaction[i];
        // step one: update list
        if (!list.find(e => e === t.tx_hash)) {
          list = list.push(t.tx_hash);
        }
        // step two: update entities
        if (!entities.get(t.tx_hash)) {
          entities = entities.set(t.tx_hash, fromJS(t));
        }
      }
      return state
        .setIn(['transactions', 'list'], list)
        .setIn(['transactions', 'entities'], entities);
    },

    [LOAD_TRANSACTIONS_SUCCESS]: state =>
      state
        .setIn(['transactions', 'loading'], false)
        .setIn(['transactions', 'error'], false),

    [LOAD_TRANSACTIONS_ERROR]: (state, { error }) =>
      state
        .setIn(['transactions', 'error'], error)
        .setIn(['transactions', 'loading'], false),

    [WITHDRAW_MODAL_OPEN]: state =>
      state.setIn(['withdrawModal', 'open'], true),

    [WITHDRAW_MODAL_CLOSE]: state =>
      state.setIn(['withdrawModal', 'open'], false),

    [LOGOUT]: () => initialState
  },
  initialState
);

export default walletReducer;
/* eslint-enable no-case-declarations, no-param-reassign */
