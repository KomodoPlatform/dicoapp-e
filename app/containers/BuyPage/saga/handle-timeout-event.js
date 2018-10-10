/**
USECASE TIMEOUT BACKGROUND TASK
- Trigger when have a new buy

- Auto cancel when there is no buy

- Still watch even switch router
*/
import { put, call, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import takeFirst from '../../../utils/sagas/take-first';
import { CHECK_TIMEOUT_EVENT } from '../constants';
import { removeSwapsData } from '../actions';

const DELAY_TIME = 20 * 1000; // 20s
let i = 1;

// function* handleTimeoutSwap() {
// Todo
// remove swap from processingList
// notification to user
// }

function* checkTimeoutEvent() {
  try {
    while (true) {
      // step one: get current swap

      // if not found stop

      // step two: compare now() with expiration field

      // dispatch timeout event

      console.log('run handle timeout event', i);
      i += 1;
      if (i >= 5) {
        i = 1;
        yield put(removeSwapsData());
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
  yield takeFirst(CHECK_TIMEOUT_EVENT, checkTimeoutEvent);
}
