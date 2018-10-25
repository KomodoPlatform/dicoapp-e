import { createSelector } from 'reselect';
import { APP_STATE_NAME } from './constants';
import { makeSelectCurrentUser } from '../App/selectors';

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
    makeSelectCurrentUser(),
    (withdrawModal, currentUser) => {
      const coins = currentUser.get('coins');
      return coins.find(e => e.get('coin') === withdrawModal.get('coin'));
    }
  );

const makeSelectDepositModal = () =>
  createSelector(selectWallet, walletState => walletState.get('depositModal'));

const makeSelectCoinDepositModal = () =>
  createSelector(
    makeSelectDepositModal(),
    makeSelectCurrentUser(),
    (depositModal, currentUser) => {
      const coins = currentUser.get('coins');
      return coins.find(e => e.get('coin') === depositModal.get('coin'));
    }
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
