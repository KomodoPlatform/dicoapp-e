import nock from 'nock';
import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import api from '../../../lib/barter-dex-api';
import { loadCoinTransactionsProcess } from '../saga';
import data, { listtransactionsdata } from './fake-data';

const TEST_URL = 'http://127.0.0.1:7783';

describe('containers/WalletPage/saga/loadCoinTransactionsProcess', () => {
  const coin = 'EQL';
  const address = 'RRVJBpA5MoeTo3beA1iP6euWWrWcJdJtXu';
  const userpass = 'userpass';
  api.setUserpass(userpass);
  it(
    'should handle loadCoinTransactionsProcess correctly',
    async done => {
      try {
        nock(TEST_URL)
          .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
          .persist()
          .post('/', () => true)
          .reply(200, (uri, body, cb) => {
            const b = JSON.parse(body);
            expect(b).toEqual({
              userpass,
              coin,
              address,
              queueid: 0,
              method: 'listtransactions',
              count: 10
            });
            cb(null, listtransactionsdata);
          });

        const dispatched = [];

        const saga = await runSaga(
          {
            dispatch: action => dispatched.push(action),
            getState: () => fromJS(data)
          },
          loadCoinTransactionsProcess,
          coin,
          address
        ).done;

        expect(saga).toEqual(1);
        expect(dispatched).toEqual([
          {
            type: 'dicoapp/WalletPage/LOAD_TRANSACTION_SUCCESS',
            payload: {
              transaction: listtransactionsdata
                .map(e => {
                  e.coin = coin;
                  return e;
                })
                .sort((a, b) => b.height - a.height)
            }
          }
        ]);

        nock.cleanAll();
        nock.enableNetConnect();
        done();
      } catch (err) {
        console.log(err);
      }
    },
    90 * 1000
  );
  it(
    'should throw error when handle loadCoinTransactionsProcess',
    async done => {
      try {
        nock(TEST_URL)
          .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
          .persist()
          .post('/', () => true)
          .reply(200, (uri, body, cb) => {
            const b = JSON.parse(body);
            expect(b).toEqual({
              userpass,
              coin,
              address,
              queueid: 0,
              method: 'listtransactions',
              count: 10
            });
            cb(new Error('some thing wrong'));
          });

        const dispatched = [];

        const saga = await runSaga(
          {
            dispatch: action => dispatched.push(action),
            getState: () => fromJS(data)
          },
          loadCoinTransactionsProcess,
          coin,
          address
        ).done;
        expect(saga).toEqual([]);
        expect(dispatched).toEqual([]);

        nock.cleanAll();
        nock.enableNetConnect();
        done();
      } catch (err) {
        console.log(err);
      }
    },
    90 * 1000
  );
});
