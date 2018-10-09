// https://github.com/hql287/Manta
// https://jestjs.io/docs/en/mock-functions
import { fromJS } from 'immutable';
import { initialState } from '../reducer';
import { APP_STATE_NAME } from '../constants';
import {
  selectBuy,
  makeSelectPrices,
  makeSelectPricesLoading,
  makeSelectPricesError,
  makeSelectPricesEntities,
  makeSelectBuying,
  makeSelectBuyingLoading,
  makeSelectBuyingError
} from '../selectors';

describe('containers/BuyPage/selectors/selectBuy', () => {
  it('should select the buy state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    expect(selectBuy(mockedState)).toEqual(initialState);
  });
});

describe('containers/BuyPage/selectors/makeSelectPrices', () => {
  it('should select the prices state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    const selectSelectPrices = makeSelectPrices();
    expect(selectSelectPrices(mockedState)).toEqual(initialState.get('prices'));

    const selectSelectPricesLoading = makeSelectPricesLoading();
    expect(selectSelectPricesLoading(mockedState)).toEqual(
      initialState.getIn(['prices', 'loading'])
    );

    const selectSelectPricesError = makeSelectPricesError();
    expect(selectSelectPricesError(mockedState)).toEqual(
      initialState.getIn(['prices', 'error'])
    );

    const selectSelectPricesEntities = makeSelectPricesEntities();
    expect(selectSelectPricesEntities(mockedState)).toEqual(
      initialState.getIn(['prices', 'entities'])
    );
  });
});

describe('containers/BuyPage/selectors/makeSelectBuying', () => {
  it('should select the prices state', () => {
    const mockedState = fromJS({
      [APP_STATE_NAME]: initialState
    });
    const selectSelectBuying = makeSelectBuying();
    expect(selectSelectBuying(mockedState)).toEqual(initialState.get('buying'));

    const selectSelectBuyingLoading = makeSelectBuyingLoading();
    expect(selectSelectBuyingLoading(mockedState)).toEqual(
      initialState.getIn(['buying', 'loading'])
    );

    const selectSelectBuyingError = makeSelectBuyingError();
    expect(selectSelectBuyingError(mockedState)).toEqual(
      initialState.getIn(['buying', 'error'])
    );
  });
});
