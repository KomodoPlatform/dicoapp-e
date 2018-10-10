import { createSelector } from 'reselect';
import { makeSelectBalanceList as makeSelectBalanceListApp } from '../App/selectors';
import getConfig from '../../utils/config';
import { APP_STATE_NAME } from './constants';

const config = getConfig();

const COIN_BASE = config.get('marketmaker.tokenconfig');

const selectBuy = state => state.get(APP_STATE_NAME);

const makeSelectPrices = () =>
  createSelector(selectBuy, buyState => buyState.get('prices'));

const makeSelectPricesLoading = () =>
  createSelector(makeSelectPrices(), pricesState => pricesState.get('loading'));

const makeSelectPricesError = () =>
  createSelector(makeSelectPrices(), pricesState => pricesState.get('error'));

const makeSelectPricesEntities = () =>
  createSelector(makeSelectPrices(), pricesState =>
    pricesState.get('entities')
  );

const makeSelectBuying = () =>
  createSelector(selectBuy, buyState => buyState.get('buying'));

const makeSelectBuyingLoading = () =>
  createSelector(makeSelectBuying(), buyingState => buyingState.get('loading'));

const makeSelectBuyingError = () =>
  createSelector(makeSelectBuying(), buyingState => buyingState.get('error'));

const makeSelectSwaps = () =>
  createSelector(selectBuy, buyState => buyState.get('swaps'));

const makeSelectSwapsLoading = () =>
  createSelector(makeSelectSwaps(), swapsState => swapsState.get('loading'));

const makeSelectSwapsError = () =>
  createSelector(makeSelectSwaps(), swapsState => swapsState.get('error'));

// NOTE: REMOVE THIS
const makeSelectSwapsList = () =>
  createSelector(makeSelectSwaps(), swapsState => swapsState.get('list'));

const makeSelectSwapsEntities = () =>
  createSelector(makeSelectSwaps(), swapsState => swapsState.get('entities'));

const makeSelectCurrentSwaps = () =>
  createSelector(makeSelectSwaps(), swapsState =>
    swapsState.get('processingList')
  );

const makeSelectFinishedSwaps = () =>
  createSelector(makeSelectSwaps(), swapsState =>
    swapsState.get('finishedList')
  );

const makeSelectCurrentSwap = () =>
  createSelector(makeSelectCurrentSwaps(), swapsState => swapsState.last());

const makeSelectBalanceList = () =>
  createSelector(makeSelectBalanceListApp(), balanceList => {
    const symbol = COIN_BASE.coin;
    return balanceList.filter(e => e !== symbol);
  });

export {
  selectBuy,
  makeSelectPrices,
  makeSelectPricesLoading,
  makeSelectPricesError,
  makeSelectPricesEntities,
  makeSelectBuying,
  makeSelectBuyingLoading,
  makeSelectBuyingError,
  makeSelectSwaps,
  makeSelectSwapsLoading,
  makeSelectSwapsError,
  makeSelectSwapsList,
  makeSelectSwapsEntities,
  makeSelectCurrentSwaps,
  makeSelectFinishedSwaps,
  makeSelectCurrentSwap,
  makeSelectBalanceList
};
