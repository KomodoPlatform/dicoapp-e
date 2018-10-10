/**
USECASE UPDATE STATUS TASK

- Trigger when have a new buy

- Auto cancel when there is no buy

- Still watch even switch router
 */
import { call, cancel, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import takeFirst from '../../../utils/sagas/take-first';
import { HANDLE_UPDATE_SWAP_EVENT } from '../constants';

const DELAY_TIME = 20 * 1000; // 20s
let i = 3;

function* handleUpdateStateEvent(time = DELAY_TIME) {
  try {
    console.log('run handle update state event');
    i += 1;
    if (i >= 3) {
      yield cancel();
    } else {
      yield call(delay, time);
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
  i = 1;
  yield takeFirst(HANDLE_UPDATE_SWAP_EVENT, handleUpdateStateEvent);
}
