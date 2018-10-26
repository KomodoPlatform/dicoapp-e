import { fromJS } from 'immutable';
import { initialState } from '../reducer';
import { APP_STATE_NAME } from '../constants';
import {
  selectWallet,
  makeSelectWithdrawModal,
  makeSelectDepositModal,
  makeSelectCoinWithdrawModal,
  makeSelectCoinDepositModal
} from '../selectors';
import data from './fake-data';

describe('containers/WalletPage/selectors/selectWallet', () => {
  it('should select the wallet state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    expect(selectWallet(mockedState)).toEqual(initialState);
  });
});

describe('containers/WalletPage/selectors/makeSelectWithdrawModal', () => {
  it('should select the withdrawModal state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    const selectWithdrawModal = makeSelectWithdrawModal();
    expect(selectWithdrawModal(mockedState)).toEqual(
      initialState.get('withdrawModal')
    );
  });
});

describe('containers/WalletPage/selectors/makeSelectDepositModal', () => {
  it('should select the depositModal state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    const selectDepositModal = makeSelectDepositModal();
    expect(selectDepositModal(mockedState)).toEqual(
      initialState.get('depositModal')
    );
  });
});

describe('containers/WalletPage/selectors/makeSelectCoinWithdrawModal', () => {
  const coin = 'KMD';
  it('should select the withdrawModal state', () => {
    let mockedState = fromJS(data);
    mockedState = mockedState.setIn(
      [APP_STATE_NAME, 'withdrawModal'],
      fromJS({
        open: true,
        coin
      })
    );

    const expected = fromJS(data.global.balance.entities[coin]);
    const selectCoinWithdrawModal = makeSelectCoinWithdrawModal();
    expect(selectCoinWithdrawModal(mockedState)).toEqual(expected);
  });
});

describe('containers/WalletPage/selectors/makeSelectCoinDepositModal', () => {
  const coin = 'KMD';
  it('should select the depositModal state', () => {
    let mockedState = fromJS(data);
    mockedState = mockedState.setIn(
      [APP_STATE_NAME, 'depositModal'],
      fromJS({
        open: true,
        coin
      })
    );
    const expected = fromJS(data.global.balance.entities[coin]);
    const selectCoinDepositModal = makeSelectCoinDepositModal();
    expect(selectCoinDepositModal(mockedState)).toEqual(expected);
  });
});
