import { fromJS } from 'immutable';
import walletSubscribe from '../subscribe';
import { APP_STATE_NAME } from '../constants';
import { loadCoinTransactionsSuccess } from '../actions';
import data from './fake-data';

const fakeDataFromSocket = {
  queueid: 10,
  result: [
    {
      tx_hash:
        'd5bbcbace5c21c0317f29e7a43dbce7540f34dd5872e74d9e47fb6417c74bfe0',
      height: 16099
    },
    {
      tx_hash:
        '8de739b6e1d065a370cb863ebb3798ac6143a80ea58152def783ed68bcfa5c1b',
      height: 17670
    },
    {
      tx_hash:
        'ac87f71d5d67d66b5201bb75146f3c4d7558c79d907d35603ba44f242d2146ef',
      height: 26807
    },
    {
      tx_hash:
        '8fe21901c37c49b977b7468edac6956c33b5da7b17f8444e96b946f038a3f422',
      height: 113219
    }
  ]
};

const TIMEOUT = 20 * 1000;

describe('containers/WalletPage/subscribe/walletSubscribe', () => {
  const coin = 'KMD';
  it(
    'should handle walletSubscribe correctly',
    async done => {
      try {
        expect(typeof walletSubscribe).toEqual('function');
        let store = fromJS(data);
        store = store.setIn(
          [APP_STATE_NAME, 'transactions', 'queueids'],
          fromJS({
            [fakeDataFromSocket.queueid]: coin
          })
        );

        let dispatched = [];

        const dispatch = action => {
          dispatched.push(action);
        };

        const getState = () => store;
        const tx = fakeDataFromSocket.result
          .sort((a, b) => b.height - a.height)
          .map(e => {
            e.coin = coin;
            return e;
          });

        let result = await walletSubscribe(
          fakeDataFromSocket,
          dispatch,
          getState
        );
        expect(result).toEqual(undefined);
        expect(dispatched).toEqual([
          loadCoinTransactionsSuccess({
            queueId: fakeDataFromSocket.queueid,
            coin,
            tx
          })
        ]);
        dispatched = [];

        fakeDataFromSocket.queueid = 23;
        result = await walletSubscribe(fakeDataFromSocket, dispatch, getState);
        expect(result).toEqual(undefined);
        expect(dispatched).toEqual([]);

        done();
      } catch (err) {
        done.fail(err);
      }
    },
    TIMEOUT
  );
});
