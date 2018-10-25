import walletReducer, { initialState } from '../reducer';
import {
  loadTransactions,
  openWithdrawModal,
  closeWithdrawModal
} from '../actions';

describe('containers/WalletPage/reducers/initial', () => {
  it('should return the initial state', () => {
    expect(walletReducer(undefined, {})).toEqual(initialState);
  });
});

describe('containers/WalletPage/reducers/loadTransactions', () => {
  it('should handle the loadTransactions action correctly', () => {
    const expectedResult = initialState
      .setIn(['transactions', 'loading'], true)
      .setIn(['transactions', 'error'], false);

    expect(walletReducer(initialState, loadTransactions())).toEqual(
      expectedResult
    );
  });
});

describe('containers/WalletPage/reducers/openWithdrawModal', () => {
  it('should handle the openWithdrawModal action correctly', () => {
    const expectedResult = initialState.setIn(['withdrawModal', 'open'], true);

    expect(walletReducer(initialState, openWithdrawModal())).toEqual(
      expectedResult
    );
  });
});

describe('containers/WalletPage/reducers/closeWithdrawModal', () => {
  it('should handle the closeWithdrawModal action correctly', () => {
    const expectedResult = initialState.setIn(['withdrawModal', 'open'], false);

    expect(walletReducer(initialState, closeWithdrawModal())).toEqual(
      expectedResult
    );
  });
});
