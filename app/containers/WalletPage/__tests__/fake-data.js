export default {
  route: {
    location: {
      pathname: '/buy',
      search: '',
      hash: ''
    }
  },
  global: {
    loading: false,
    error: false,
    currentUser: {
      result: 'success',
      userpass: 'no_hehe_userpass',
      mypubkey: 'no_hehe_mypubkey',
      pubsecp: 'no_hehe_pubsecp',
      KMD: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
      BTC: '1HD77JGnkyqtj3ESgqjG18aJkb41aknPyv',
      NXT: 'NXT-5ZEZ-RC2J-RW2V-E49ZA',
      coins: [
        {
          txfee: 20000,
          rpc: '127.0.0.1:8332',
          height: -1,
          smartaddress: '1HD77JGnkyqtj3ESgqjG18aJkb41aknPyv',
          wiftype: 128,
          coin: 'BTC',
          p2shtype: 5,
          status: 'inactive',
          pubtype: 0,
          installed: false,
          balance: 0
        },
        {
          zcredits: 0,
          zdebits: {
            swaps: [],
            pendingswaps: 0
          },
          txfee: 1000,
          rpc: '127.0.0.1:7771',
          height: 0,
          smartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          wiftype: 188,
          KMDvalue: 0,
          coin: 'KMD',
          p2shtype: 85,
          status: 'inactive',
          pubtype: 60,
          installed: true,
          balance: 0
        },
        {
          txfee: 1000,
          rpc: '127.0.0.1:10306',
          height: -1,
          smartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          wiftype: 188,
          coin: 'EQL',
          p2shtype: 85,
          status: 'inactive',
          pubtype: 60,
          installed: false,
          balance: 0
        },
        {
          txfee: 100000,
          rpc: '127.0.0.1:9332',
          height: -1,
          smartaddress: 'LbS4NWacqe5wyqvbryiZH9e4xoRHk9WNUJ',
          wiftype: 176,
          coin: 'LTC',
          p2shtype: 5,
          status: 'inactive',
          pubtype: 48,
          installed: false,
          balance: 0
        },
        {
          txfee: 1000,
          rpc: '127.0.0.1:11116',
          height: -1,
          smartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          wiftype: 188,
          coin: 'PIZZA',
          p2shtype: 85,
          status: 'inactive',
          pubtype: 60,
          installed: false,
          balance: 0
        },
        {
          txfee: 1000,
          rpc: '127.0.0.1:8923',
          height: -1,
          smartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          wiftype: 188,
          coin: 'BEER',
          p2shtype: 85,
          status: 'inactive',
          pubtype: 60,
          installed: false,
          balance: 0
        },
        {
          txfee: 1000,
          rpc: '127.0.0.1:14276',
          height: -1,
          smartaddress: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          wiftype: 188,
          coin: 'COQUI',
          p2shtype: 85,
          status: 'inactive',
          pubtype: 60,
          installed: false,
          balance: 0
        }
      ]
    },
    balance: {
      init: true,
      loading: false,
      error: false,
      coins: ['BTC', 'KMD', 'EQL', 'LTC', 'PIZZA', 'COQUI', 'BEER'],
      entities: {
        BTC: {
          coin: 'BTC',
          address: '1HD77JGnkyqtj3ESgqjG18aJkb41aknPyv',
          balance: 0,
          loading: false,
          error: false
        },
        KMD: {
          coin: 'KMD',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 3.5524436,
          loading: false,
          error: false
        },
        EQL: {
          coin: 'EQL',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 2.11114249,
          loading: false,
          error: false
        },
        LTC: {
          coin: 'LTC',
          address: 'LbS4NWacqe5wyqvbryiZH9e4xoRHk9WNUJ',
          balance: 0,
          loading: false,
          error: false
        },
        PIZZA: {
          coin: 'PIZZA',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 0.67699,
          loading: false,
          error: false
        },
        COQUI: {
          coin: 'COQUI',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 293.71689487,
          loading: false,
          error: false
        },
        BEER: {
          coin: 'BEER',
          address: 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu',
          balance: 7546.5974814,
          loading: false,
          error: false
        }
      }
    }
  },
  logoutDialog: {
    show: false
  },
  websocket: {
    isStartWebsocket: true
  },
  login: {},
  buy: {
    prices: {
      loading: false,
      error: false,
      entities: {
        BTC: {
          zcredits: 0,
          pubkey: '',
          depth: 0,
          bestPrice: 0,
          price: 0,
          avevolume: 0,
          base: 'COQUI',
          address: '',
          numutxos: 0,
          rel: 'BTC',
          maxvolume: 0,
          age: 0
        },
        EQL: {
          zcredits: 0,
          pubkey: '',
          depth: 0,
          bestPrice: 0,
          price: 0,
          avevolume: 0,
          base: 'COQUI',
          address: '',
          numutxos: 0,
          rel: 'EQL',
          maxvolume: 0,
          age: 0
        },
        LTC: {
          zcredits: 0,
          pubkey: '',
          depth: 0,
          bestPrice: 0,
          price: 0,
          avevolume: 0,
          base: 'COQUI',
          address: '',
          numutxos: 0,
          rel: 'LTC',
          maxvolume: 0,
          age: 0
        },
        PIZZA: {
          zcredits: 0,
          pubkey: '',
          depth: 0,
          bestPrice: 0,
          price: 0,
          avevolume: 0,
          base: 'COQUI',
          address: '',
          numutxos: 0,
          rel: 'PIZZA',
          maxvolume: 0,
          age: 0
        },
        KMD: {
          zcredits: 0,
          pubkey: '',
          depth: 0,
          bestPrice: 0,
          price: 0,
          avevolume: 0,
          base: 'COQUI',
          address: '',
          numutxos: 0,
          rel: 'KMD',
          maxvolume: 0,
          age: 0
        },
        BEER: {
          zcredits: 0,
          pubkey:
            'f5e71f32fbb1b16599f12c264b75f45c7bea63de6ed93899c499d35cc6ef466a',
          depth: 248.65050119,
          bestPrice: 2.14920001,
          price: 1.99000001,
          avevolume: 0.9751,
          base: 'COQUI',
          address: 'REbwjC5mfQBRevH78CuRjcvQudxa3ii5Ma',
          numutxos: 255,
          rel: 'BEER',
          maxvolume: 19900.00009536,
          age: 28
        }
      }
    },
    buying: {
      loading: false,
      error: false
    },
    swaps: {
      loading: true,
      error: false,
      list: [],
      entities: {
        '153a5b01fe56576c3cc4c69256b65a68decd2c407e85d84deb119085c020e2de': {
          alice: 'BEER',
          requestid: 1608293148,
          bobamount: 18.71282889,
          sentflags: [
            'myfee',
            'bobdeposit',
            'alicepayment',
            'bobpayment',
            'alicespend'
          ],
          expiration: 1537798364,
          status: 'finished',
          bob: 'COQUI',
          quoteid: 483165878,
          aliceamount: 39.8000902,
          id: 78984078,
          uuid:
            '153a5b01fe56576c3cc4c69256b65a68decd2c407e85d84deb119085c020e2de'
        },
        '1bff08402dac74aaa9a1b1fc1d43ac79dc2e3ff3abeae622ebd9f4e63a50c15e': {
          alice: 'BEER',
          requestid: 506139685,
          bobamount: 9.12346433,
          sentflags: [
            'myfee',
            'bobdeposit',
            'alicepayment',
            'bobrefund',
            'alicereclaim'
          ],
          expiration: 1537793618,
          status: 'finished',
          bob: 'COQUI',
          quoteid: 1776465996,
          aliceamount: 18.51860853,
          id: 58783593,
          uuid:
            '1bff08402dac74aaa9a1b1fc1d43ac79dc2e3ff3abeae622ebd9f4e63a50c15e'
        },
        '4851b94829c0c009fee4c2e646e5ba39bfd7587a0a28e37311555f35f2d44589': {
          alice: 'BEER',
          requestid: 2199683683,
          bobamount: 4.36342802,
          sentflags: [
            'myfee',
            'bobdeposit',
            'alicepayment',
            'bobpayment',
            'alicespend'
          ],
          expiration: 1537801147,
          status: 'finished',
          bob: 'COQUI',
          quoteid: 3273829115,
          aliceamount: 9.25934926,
          id: 2027363021,
          uuid:
            '4851b94829c0c009fee4c2e646e5ba39bfd7587a0a28e37311555f35f2d44589'
        }
      }
    }
  }
};

export const listtransactionsdata = [
  {
    tx_hash: 'd5bbcbace5c21c0317f29e7a43dbce7540f34dd5872e74d9e47fb6417c74bfe0',
    height: 16099
  },
  {
    tx_hash: '8de739b6e1d065a370cb863ebb3798ac6143a80ea58152def783ed68bcfa5c1b',
    height: 17670
  },
  {
    tx_hash: 'ac87f71d5d67d66b5201bb75146f3c4d7558c79d907d35603ba44f242d2146ef',
    height: 26807
  },
  {
    tx_hash: '8fe21901c37c49b977b7468edac6956c33b5da7b17f8444e96b946f038a3f422',
    height: 113219
  }
];

it('containers/WalletPage/saga/fake-data', () => {
  expect(1).toEqual(1);
});
