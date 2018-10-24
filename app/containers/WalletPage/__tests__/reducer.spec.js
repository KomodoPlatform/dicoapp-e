import walletReducer, { initialState } from '../reducer';
import { loadTransactions } from '../actions';

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
