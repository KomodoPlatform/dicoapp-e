import { fromJS } from 'immutable';
import walletReducer, {
  initialState,
  generateCoinTransactionRecord
} from '../reducer';
import {
  loadTransactions,
  loadCoinTransactions,
  openWithdrawModal,
  closeWithdrawModal,
  openDepositModal,
  closeDepositModal
} from '../actions';

describe('containers/WalletPage/reducers/initial', () => {
  it('should return the initial state', () => {
    expect(walletReducer(undefined, {})).toEqual(initialState);
  });
});

describe('containers/WalletPage/reducers/loadTransactions', () => {
  it('should handle the loadTransactions action correctly', () => {
    const expectedResult = initialState.setIn(
      ['transactions', 'loading'],
      true
    );

    expect(walletReducer(initialState, loadTransactions())).toEqual(
      expectedResult
    );
  });
});

describe('containers/WalletPage/reducers/openWithdrawModal', () => {
  const coin = 'KMD';
  it('should handle the openWithdrawModal action correctly', () => {
    const expectedResult = initialState
      .setIn(['withdrawModal', 'open'], true)
      .setIn(['withdrawModal', 'coin'], coin);

    expect(walletReducer(initialState, openWithdrawModal(coin))).toEqual(
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

describe('containers/WalletPage/reducers/openDepositModal', () => {
  const coin = 'KMD';
  it('should handle the openDepositModal action correctly', () => {
    const expectedResult = initialState
      .setIn(['depositModal', 'open'], true)
      .setIn(['depositModal', 'coin'], coin);

    expect(walletReducer(initialState, openDepositModal(coin))).toEqual(
      expectedResult
    );
  });
});

describe('containers/WalletPage/reducers/closeDepositModal', () => {
  it('should handle the closeDepositModal action correctly', () => {
    const expectedResult = initialState.setIn(['depositModal', 'open'], false);

    expect(walletReducer(initialState, closeDepositModal())).toEqual(
      expectedResult
    );
  });
});

describe('containers/WalletPage/reducers/loadCoinTransactions', () => {
  const data = {
    result: 'success',
    status: 'queued',
    coin: 'KMD',
    queueId: 23
  };
  it('should handle the loadCoinTransactions action correctly', () => {
    const expectedResult = initialState
      .setIn(
        ['transactions', 'queueids'],
        fromJS({
          [data.queueId]: data.coin
        })
      )
      .setIn(
        ['transactions', 'coins'],
        fromJS({
          [data.coin]: generateCoinTransactionRecord()
        })
      );

    expect(walletReducer(initialState, loadCoinTransactions(data))).toEqual(
      expectedResult
    );
  });
});
