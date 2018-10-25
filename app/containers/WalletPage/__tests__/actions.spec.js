import {
  loadTransactions,
  loadTransactionsSuccess,
  openWithdrawModal,
  closeWithdrawModal
} from '../actions';
import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTIONS_SUCCESS,
  WITHDRAW_MODAL_OPEN,
  WITHDRAW_MODAL_CLOSE
} from '../constants';

describe('containers/WalletPage/actions/loadTransactions', () => {
  it('should loadTransactions should create loadTransactions action', () => {
    expect(loadTransactions()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_TRANSACTIONS
    };

    expect(loadTransactions()).toEqual(expectedResult);
  });
});

describe('containers/WalletPage/actions/loadTransactionsSuccess', () => {
  it('should loadTransactionsSuccess should create loadTransactionsSuccess action', () => {
    expect(loadTransactionsSuccess()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_TRANSACTIONS_SUCCESS
    };

    expect(loadTransactionsSuccess()).toEqual(expectedResult);
  });
});

describe('containers/WalletPage/actions/openWithdrawModal', () => {
  it('should loadTransactionsSuccess should create openWithdrawModal action', () => {
    expect(openWithdrawModal()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: WITHDRAW_MODAL_OPEN
    };

    expect(openWithdrawModal()).toEqual(expectedResult);
  });
});

describe('containers/WalletPage/actions/closeWithdrawModal', () => {
  it('should loadTransactionsSuccess should create closeWithdrawModal action', () => {
    expect(closeWithdrawModal()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: WITHDRAW_MODAL_CLOSE
    };

    expect(closeWithdrawModal()).toEqual(expectedResult);
  });
});
