import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';

const selectWallet = state => state.get(APP_STATE_NAME);

const makeSelectTransactions = () =>
  createSelector(selectWallet, walletState => walletState.get('transactions'));

const makeSelectTransactionsLoading = () =>
  createSelector(makeSelectTransactions(), transactionsState =>
    transactionsState.get('loading')
  );

const makeSelectTransactionsError = () =>
  createSelector(makeSelectTransactions(), transactionsState =>
    transactionsState.get('error')
  );

const makeSelectTransactionsList = () =>
  createSelector(makeSelectTransactions(), transactionsState =>
    transactionsState.get('list')
  );

const makeSelectTransactionsEntities = () =>
  createSelector(makeSelectTransactions(), transactionsState =>
    transactionsState.get('entities')
  );

const makeSelectWithdrawModal = () =>
  createSelector(selectWallet, walletState => walletState.get('withdrawModal'));

const makeSelectDepositModal = () =>
  createSelector(selectWallet, walletState => walletState.get('depositModal'));

export {
  selectWallet,
  makeSelectTransactionsLoading,
  makeSelectTransactionsError,
  makeSelectTransactionsList,
  makeSelectTransactionsEntities,
  makeSelectTransactions,
  makeSelectWithdrawModal,
  makeSelectDepositModal
};
