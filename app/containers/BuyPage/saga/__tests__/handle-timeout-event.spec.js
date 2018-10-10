import { fromJS } from 'immutable';
import { runSaga } from 'redux-saga';
import data from './fake-data';
import { checkTimeoutEvent } from '../handle-timeout-event';
import { CHECK_TIMEOUT_EVENT, SWAP_TIMEOUT } from '../../constants';
import { SWAP_STATE_ZERO } from '../../__tests__/fake-data';

describe('containers/BuyPage/saga/handle-timeout-event', () => {
  it(
    'should handle handleTimeoutEvent correctly',
    async done => {
      const dispatched = [];
      let store = fromJS(data);
      let processingList = store.getIn(['buy', 'swaps', 'processingList']);
      processingList = processingList.push(SWAP_STATE_ZERO.uuid);
      let entities = store.getIn(['buy', 'swaps', 'entities']);
      const entity = fromJS({
        id: SWAP_STATE_ZERO.tradeid,
        uuid: SWAP_STATE_ZERO.uuid,
        requestid: SWAP_STATE_ZERO.requestid,
        quoteid: SWAP_STATE_ZERO.quoteid,
        expiration: SWAP_STATE_ZERO.expiration,
        bob: SWAP_STATE_ZERO.bob,
        alice: SWAP_STATE_ZERO.alice,
        bobamount: SWAP_STATE_ZERO.basevalue,
        aliceamount: SWAP_STATE_ZERO.relvalue,
        sentflags: [],
        status: 'pending'
      });
      entities = entities.set(SWAP_STATE_ZERO.uuid, entity);
      store = store.setIn(['buy', 'swaps', 'processingList'], processingList);
      store = store.setIn(['buy', 'swaps', 'entities'], entities);

      const saga = await runSaga(
        {
          dispatch: action => dispatched.push(action),
          getState: () => store
        },
        checkTimeoutEvent,
        {
          payload: {
            type: CHECK_TIMEOUT_EVENT
          }
        },
        1
      ).done;

      expect(saga).toEqual(undefined);
      expect(dispatched).toEqual([
        {
          payload: {
            id: SWAP_STATE_ZERO.tradeid,
            uuid: SWAP_STATE_ZERO.uuid,
            requestid: SWAP_STATE_ZERO.requestid,
            quoteid: SWAP_STATE_ZERO.quoteid,
            bob: SWAP_STATE_ZERO.bob,
            alice: SWAP_STATE_ZERO.alice
          },
          type: SWAP_TIMEOUT
        }
      ]);

      done();
    },
    90 * 1000
  );
});
