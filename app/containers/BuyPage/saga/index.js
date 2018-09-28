import { takeEvery, takeLatest } from 'redux-saga/effects';
import takeFirst from '../../../utils/sagas/take-first';
import {
  LOAD_PRICES,
  LOAD_PRICE,
  LOAD_BUY_COIN,
  LOAD_RECENT_SWAPS
} from '../constants';
import loadBuyCoinProcess from './load-buy-coin-process';
import loadPricesProcess, { loadPriceProcess } from './load-prices-process';
import loadRecentSwapsProcess from './load-recent-swaps-process';

/**
 * Root saga manages watcher lifecycle
 */
export default function* buyData() {
  yield takeLatest(LOAD_PRICES, loadPricesProcess);
  yield takeFirst(LOAD_RECENT_SWAPS, loadRecentSwapsProcess);
  yield takeEvery(LOAD_PRICE, loadPriceProcess);
  yield takeFirst(LOAD_BUY_COIN, loadBuyCoinProcess);
}
