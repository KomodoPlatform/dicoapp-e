import { fromJS } from 'immutable';
import { initialState } from '../reducer';
import { APP_STATE_NAME } from '../constants';
import { selectWallet, makeSelectWithdrawModal } from '../selectors';

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
