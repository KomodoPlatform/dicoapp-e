import { call, cancelled } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import takeFirst from '../../../utils/sagas/take-first';
import { HANDLE_UPDATE_STATE_EVENT } from '../constants';

const DELAY_TIME = 20 * 1000; // 20s

function* handleUpdateStateEvent(time = DELAY_TIME) {
  try {
    console.log('run handle update state event');
    yield call(delay, time);
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
  yield takeFirst(HANDLE_UPDATE_STATE_EVENT, handleUpdateStateEvent);
}
