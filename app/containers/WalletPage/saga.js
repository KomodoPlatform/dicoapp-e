import { all, call, put, select, cancelled } from 'redux-saga/effects';
import { CANCEL } from 'redux-saga';
import takeFirst from '../../utils/sagas/take-first';
import { LOAD_TRANSACTIONS } from './constants';
import { makeSelectCurrentUser } from '../App/selectors';
import api from '../../lib/barter-dex-api';
import {
  loadTransactionSuccess,
  loadTransactionsSuccess,
  loadTransactionsError
} from './actions';

const debug = require('debug')('dicoapp:containers:WalletPage:saga');

export function* loadCoinTransactionsProcess(coin, address) {
  let request = null;
  try {
    debug(`load coin transaction process running ${coin}`);

    request = api.listTransactions({
      coin,
      address
    });

    let data = yield request;

    // sort
    data = data.sort((a, b) => b.height - a.height);

    // only take 10 records
    data = data.slice(0, 10);

    // add coin symbol
    data = data.map(e => {
      e.coin = coin;
      return e;
    });

    return yield put(loadTransactionSuccess(data));
  } catch (err) {
    debug(`load coin transaction process fail ${coin}: ${err.message}`);
    return [];
  } finally {
    if (yield cancelled()) {
      debug(`load coin transaction process cancelled ${coin}`);
      if (request && request[CANCEL]) {
        request[CANCEL]();
      }
    }
  }
}

export function* loadTransactionsProcess() {
  try {
    // load user data
    debug('load transactions process start');
    const user = yield select(makeSelectCurrentUser());
    if (!user) {
      throw new Error('not found user');
    }
    const coins = user.get('coins');

    const requests = [];
    for (let i = 0; i < coins.size; i += 1) {
      const e = coins.get(i);
      const coin = e.get('coin');
      const address = e.get('smartaddress');
      requests.push(call(loadCoinTransactionsProcess, coin, address));
    }
    // https://github.com/chainmakers/dicoapp/blob/glxt/.desktop/modules/marketmaker/index.js#L1144
    yield all(requests);
    return yield put(loadTransactionsSuccess());
  } catch (err) {
    return yield put(loadTransactionsError(err.message));
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* walletData() {
  yield takeFirst(LOAD_TRANSACTIONS, loadTransactionsProcess);
}
