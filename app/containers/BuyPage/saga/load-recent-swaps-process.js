import { put, all, call, cancelled, select } from 'redux-saga/effects';
import api from '../../../lib/barter-dex-api';
// import { loadSwapSuccess } from '../../App/actions';
import { loadRecentSwapsCoin, loadRecentSwapsError } from '../actions';
import { makeSelectSwapsEntities } from '../selectors';

// NOTE: MOVE THIS TO handle-update-swap-event.js

const debug = require('debug')(
  'dicoapp:containers:BuyPage:saga:load-recent-swaps-process'
);

export function* checkSwap(requestid, quoteid, isPending) {
  try {
    const swapelem = {
      requestid,
      quoteid
    };

    const swapstatusResult = yield call([api, 'swapstatus'], swapelem);

    yield put(loadRecentSwapsCoin(swapstatusResult));

    if (isPending && swapstatusResult.status === 'finished') {
      // NOTE: turn this off since we really run it in subscribe func
      debug(`isPending = ${isPending}`);
      // yield put(
      //   loadSwapSuccess([
      //     {
      //       coin: swapstatusResult.bob,
      //       value: swapstatusResult.srcamount
      //     },
      //     {
      //       coin: swapstatusResult.alice,
      //       value: 0 - swapstatusResult.destamount
      //     }
      //   ])
      // );
    }
    return true;
  } finally {
    if (yield cancelled()) {
      console.log('Sync cancelled!');
    }
  }
}

export default function* loadRecentSwapsProcess() {
  try {
    const recentswapsResult = yield call([api, 'recentswaps']);

    const swapsEntities = yield select(makeSelectSwapsEntities());

    const { swaps } = recentswapsResult;
    const requests = [];
    for (let i = 0; i < swaps.length; i += 1) {
      const swapobj = swaps[i];
      // eslint-disable-next-line no-await-in-loop
      const e = swapsEntities.find(
        val =>
          val.get('requestid') === swapobj[0] &&
          val.get('quoteid') === swapobj[1]
      );
      if (!e) {
        requests.push(call(checkSwap, swapobj[0], swapobj[1]));
      } else if (e.get('status') === 'pending') {
        requests.push(call(checkSwap, swapobj[0], swapobj[1], true));
      }
    }
    const data = yield all(requests);
    debug('load recent swaps process', data);
  } catch (err) {
    // FIXME: handling error
    return yield put(loadRecentSwapsError(err.message));
  } finally {
    if (yield cancelled()) {
      console.log('Sync cancelled!');
    }
  }
}
