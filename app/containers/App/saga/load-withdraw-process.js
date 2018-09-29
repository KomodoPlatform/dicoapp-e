// https://github.com/react-boilerplate/react-boilerplate/issues/1277#issuecomment-263267639
import { put, select } from 'redux-saga/effects';
import api from '../../../utils/barter-dex-api';
import { makeSelectCurrentUser } from '../selectors';
import { loadWithdrawSuccess, loadWithdrawError } from '../actions';

const debug = require('debug')(
  'dicoapp:containers:App:saga:load-withdraw-process'
);

const numcoin = 100000000;

export default function* loadWithdrawProcess({ payload }) {
  try {
    // load user data
    const user = yield select(makeSelectCurrentUser());
    if (!user) {
      throw new Error('not found user');
    }
    const userpass = user.get('userpass');

    const { amount, address, coin } = payload;

    let outputs = `[{${address}: ${Number(amount)}}]`;

    // eslint-disable-next-line no-eval
    outputs = JSON.stringify(eval(`(${outputs})`));

    const sendparams = {
      userpass,
      coin,
      outputs: JSON.parse(outputs)
    };

    const resultWithdraw = yield api.withdraw(sendparams);

    const { hex, txfee } = resultWithdraw;

    const sendrawtx = {
      userpass,
      coin,
      signedtx: hex
    };
    const resultSendrawtx = yield api.sendRawTransaction(sendrawtx);
    debug(`resultSendrawtx = ${resultSendrawtx}`);

    // eslint-disable-next-line no-param-reassign
    payload.amount += txfee / numcoin;

    return yield put(loadWithdrawSuccess(payload));
  } catch (err) {
    return yield put(loadWithdrawError(payload, err.message));
  }
}
