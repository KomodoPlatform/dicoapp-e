import getfeeFactory from '../getfee';

describe('utils/barter-dex-api/getfee', () => {
  it('should handle the getfee correctly', () => {
    const state = {
      userpass: null
    };
    const coin = 'BEER';
    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          method: 'getfee'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, getfeeFactory(state));
    api.getfee({
      coin
    });
  });
});
