/**
USECASE UPDATE STATUS TASK

- Trigger when have a new buy

- Auto cancel when there is no buy

- Still watch even switch router
 */
import { call, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import takeFirst from '../../../utils/sagas/take-first';
import { CHECK_UPDATE_SWAP_EVENT } from '../constants';

const DELAY_TIME = 20 * 1000; // 20s
let i = 1;

function* checkUpdateStateEvent() {
  try {
    while (true) {
      // step one: get current swap

      // if not found stop

      // dispatch loadRecentSwapsProcess action

      console.log('run handle update state event', i);
      i += 1;
      if (i >= 5) {
        i = 1;
        break;
        // yield cancel();
      } else {
        yield call(delay, DELAY_TIME);
      }
    }
  } catch (err) {
    // eslint-disable-next-line no-empty
  } finally {
    if (yield cancelled()) {
      console.log('to do something');
    }
  }
}

/**
 * Root saga manages watcher lifecycle
 */
export default function* root() {
  yield takeFirst(CHECK_UPDATE_SWAP_EVENT, checkUpdateStateEvent);
}
