import {
  loadPrice,
  loadPrices,
  loadPricesSuccess,
  loadBestPrice,
  loadBuyCoin,
  loadBuyCoinError,
  removeSwapsData,
  handleTimeoutEvent,
  handleUpdateSwapEvent
} from '../actions';
import {
  LOAD_PRICE,
  LOAD_PRICES,
  LOAD_PRICES_SUCCESS,
  LOAD_BEST_PRICE,
  LOAD_BUY_COIN,
  LOAD_BUY_COIN_ERROR,
  REMOVE_SWAPS_DATA,
  HANDLE_TIMEOUT_EVENT,
  HANDLE_UPDATE_SWAP_EVENT
} from '../constants';

describe('containers/BuyPage/actions/loadPrice', () => {
  const coin = 'coin';

  it('should loadPrice should create loadPrice action', () => {
    expect(loadPrice(coin)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_PRICE,
      payload: {
        coin
      }
    };

    expect(loadPrice(coin)).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/actions/loadPrices', () => {
  it('should loadPrices should create loadPrices action', () => {
    expect(loadPrices()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_PRICES
    };

    expect(loadPrices()).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/actions/loadPricesSuccess', () => {
  it('should loadPricesSuccess should create loadPricesSuccess action', () => {
    expect(loadPricesSuccess()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_PRICES_SUCCESS
    };

    expect(loadPricesSuccess()).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/actions/loadBestPrice', () => {
  const payload = {
    address: '',
    age: 0,
    avevolume: 0,
    base: 'COQUI',
    bestPrice: 0,
    depth: 0,
    maxvolume: 0,
    numutxos: 0,
    price: 0,
    pubkey: '',
    rel: 'PIZZA',
    zcredits: 0
  };
  it('should loadBestPrice should create loadBestPrice action', () => {
    expect(loadBestPrice(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_BEST_PRICE,
      payload
    };

    expect(loadBestPrice(payload)).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/actions/loadBuyCoin', () => {
  const payload = {
    basecoin: 'BTC',
    paymentcoin: 'KMD',
    amount: 1.234
  };

  it('should loadBuyCoin should create loadBuyCoin action', () => {
    expect(loadBuyCoin(payload)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_BUY_COIN,
      payload
    };

    expect(loadBuyCoin(payload)).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/actions/loadBuyCoinError', () => {
  const message = 'Value is large than balance';

  it('should loadBuyCoin should create loadBuyCoinError action', () => {
    expect(loadBuyCoinError(message)).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: LOAD_BUY_COIN_ERROR,
      error: {
        message
      }
    };

    expect(loadBuyCoinError(message)).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/actions/removeSwapsData', () => {
  it('should removeSwapsData should create removeSwapsData action', () => {
    expect(removeSwapsData()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: REMOVE_SWAPS_DATA
    };

    expect(removeSwapsData()).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/actions/handleTimeoutEvent', () => {
  it('should handleTimeoutEvent should create handleTimeoutEvent action', () => {
    expect(handleTimeoutEvent()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: HANDLE_TIMEOUT_EVENT
    };

    expect(handleTimeoutEvent()).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/actions/handleUpdateSwapEvent', () => {
  it('should handleUpdateSwapEvent should create handleUpdateSwapEvent action', () => {
    expect(handleUpdateSwapEvent()).toMatchSnapshot();
  });

  it('should return the correct type and the passed name', () => {
    const expectedResult = {
      type: HANDLE_UPDATE_SWAP_EVENT
    };

    expect(handleUpdateSwapEvent()).toEqual(expectedResult);
  });
});
