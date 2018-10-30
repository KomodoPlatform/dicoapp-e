/* eslint-disable no-case-declarations, no-param-reassign */
import { fromJS } from 'immutable';
import { handleActions } from 'redux-actions';

import {
  TRANSACTIONS_LOAD,
  LOAD_TRANSACTION_SUCCESS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
  WITHDRAW_MODAL_OPEN,
  WITHDRAW_MODAL_CLOSE,
  DEPOSIT_MODAL_OPEN,
  DEPOSIT_MODAL_CLOSE
} from './constants';

import { LOGOUT } from '../App/constants';

// The initial state of the App
export const initialState = fromJS({
  // transactions: {
  //   loading: false,
  //   error: false,
  //   list: [],
  //   entities: {}
  // },
  transactions: {
    loading: false,
    queueids: {},
    coins: {}
  },
  withdrawModal: {
    open: false,
    coin: null
  },
  depositModal: {
    open: false,
    coin: null
  }
});

const walletReducer = handleActions(
  {
    [TRANSACTIONS_LOAD]: state =>
      state.setIn(['transactions', 'loading'], true),

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

    [WITHDRAW_MODAL_OPEN]: (state, { payload }) =>
      state
        .setIn(['withdrawModal', 'open'], true)
        .setIn(['withdrawModal', 'coin'], payload.coin),

    [WITHDRAW_MODAL_CLOSE]: state =>
      state.setIn(['withdrawModal', 'open'], false),

    [DEPOSIT_MODAL_OPEN]: (state, { payload }) =>
      state
        .setIn(['depositModal', 'open'], true)
        .setIn(['depositModal', 'coin'], payload.coin),

    [DEPOSIT_MODAL_CLOSE]: state =>
      state.setIn(['depositModal', 'open'], false),

    [LOGOUT]: () => initialState
  },
  initialState
);

export default walletReducer;
/* eslint-enable no-case-declarations, no-param-reassign */

// TRY TO TEST SOME DATA STRUCT

const example = fromJS({
  transactions: {
    loading: false,
    queueids: {
      1: 'KMD',
      2: 'BTC'
    },
    coins: {
      KMD: {
        // RECORD TYPE
        error: false,
        list: [],
        entities: {}
      }
    }
  }
});

console.log(example.size, 'example.size');
const transactions = example.get('transactions');
console.log(transactions.size, 'transactions.size');
// how to check loading state?
const queueids = example.getIn(['transactions', 'queueids']);
console.log(queueids.size, 'queueids.size');
// how to filter transaction by coin? find KMD
const coins = example.getIn(['transactions', 'coins']);
console.log(coins.get('KMD').toJS(), "coins.get('KMD') 23");
