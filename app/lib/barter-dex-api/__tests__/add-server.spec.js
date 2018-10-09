import addServerFactory from '../add-server';

describe('utils/barter-dex-api/add-server', () => {
  it('should handle the addServer correctly', () => {
    const state = {
      userpass: null
    };
    const coin = 'coin';
    const ipaddr = '127.0.0.1';
    const port = 65000;

    const fakeHttpProvider = {
      privateCall(params) {
        expect(params).toEqual({
          coin,
          ipaddr,
          port,
          method: 'electrum'
        });
      }
    };
    const api = Object.assign({}, fakeHttpProvider, addServerFactory(state));
    api.addServer({
      coin,
      ipaddr,
      port
    });
  });
});
