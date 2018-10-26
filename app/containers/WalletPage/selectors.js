import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';
import { makeSelectBalanceEntities } from '../App/selectors';

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

const makeSelectCoinWithdrawModal = () =>
  createSelector(
    makeSelectWithdrawModal(),
    makeSelectBalanceEntities(),
    (withdrawModal, balance) => balance.get(withdrawModal.get('coin'))
  );

const makeSelectDepositModal = () =>
  createSelector(selectWallet, walletState => walletState.get('depositModal'));

const makeSelectCoinDepositModal = () =>
  createSelector(
    makeSelectDepositModal(),
    makeSelectBalanceEntities(),
    (depositModal, balance) => balance.get(depositModal.get('coin'))
  );

export {
  selectWallet,
  makeSelectTransactionsLoading,
  makeSelectTransactionsError,
  makeSelectTransactionsList,
  makeSelectTransactionsEntities,
  makeSelectTransactions,
  makeSelectWithdrawModal,
  makeSelectCoinWithdrawModal,
  makeSelectDepositModal,
  makeSelectCoinDepositModal
};
