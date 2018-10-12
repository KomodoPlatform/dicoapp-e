import { fromJS } from 'immutable';
import buyReducer, { initialState } from '../reducer';
import {
  loadPrices,
  loadBuyCoin,
  loadBuyCoinSuccess,
  loadBuyCoinError,
  loadRecentSwapsDataFromWebsocket,
  loadRecentSwapsCoin,
  timeoutSwap,
  makeANewSwap
} from '../actions';
import {
  WEBSOCKET_STATE_ZERO,
  WEBSOCKET_STATE_ONE,
  WEBSOCKET_STATE_TWO,
  WEBSOCKET_STATE_THREE,
  WEBSOCKET_STATE_FOUR,
  WEBSOCKET_STATE_FIVE,
  WEBSOCKET_STATE_SIX,
  WEBSOCKET_STATE_SEVEN,
  SWAP_STATE_ZERO,
  SWAP_STATE_ONE,
  SWAP_STATE_TWO,
  SWAP_STATE_THREE,
  SWAP_STATE_FOUR,
  SWAP_STATE_FIVE
  // LOAD_SWAP_SUCCESS
} from './fake-data';

describe('containers/BuyPage/reducers/initial', () => {
  it('should return the initial state', () => {
    expect(buyReducer(undefined, {})).toEqual(initialState);
  });
});

describe('containers/BuyPage/reducers/loadPrices', () => {
  it('should handle the loadPrices action correctly', () => {
    const expectedResult = initialState
      .setIn(['prices', 'loading'], true)
      .setIn(['prices', 'error'], false);

    expect(buyReducer(initialState, loadPrices())).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/reducers/loadBuyCoin', () => {
  it('should handle the loadBuyCoin action correctly', () => {
    const expectedResult = initialState
      .setIn(['buying', 'loading'], true)
      .setIn(['buying', 'error'], false);

    expect(
      buyReducer(
        initialState,
        loadBuyCoin({
          basecoin: 'BTC',
          paymentcoin: 'KMD',
          amount: 10.123
        })
      )
    ).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/reducers/loadBuyCoinError', () => {
  it('should handle the loadBuyCoinError action correctly', () => {
    const message = 'Not enough balance!';
    const expectedResult = initialState
      .setIn(['buying', 'loading'], false)
      .setIn(['buying', 'error'], {
        message
      });

    expect(buyReducer(initialState, loadBuyCoinError(message))).toEqual(
      expectedResult
    );
  });
});

describe('containers/BuyPage/reducers/loadRecentSwapsDataFromWebsocket', () => {
  const { uuid } = WEBSOCKET_STATE_ZERO;

  let store = initialState
    .setIn(['swaps', 'processingList'], fromJS([uuid]))
    .setIn(
      ['swaps', 'entities'],
      fromJS({
        [uuid]: WEBSOCKET_STATE_ZERO
      })
    );

  it('should handle the loadRecentSwapsDataFromWebsocket action correctly', () => {
    let entities = store.getIn(['swaps', 'entities']);
    let entity = entities.get(uuid);
    entity = entity
      .set('sentflags', fromJS(['myfee']))
      .set('expiration', WEBSOCKET_STATE_ONE.result.expiration);
    let expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_ONE.result)
    );
    expect(store).toEqual(expectedResult);
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_TWO.result)
    );
    expect(store).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    entity = entity
      .set(
        'sentflags',
        entity.get('sentflags').unshift(WEBSOCKET_STATE_THREE.result.update)
      )
      .set('expiration', WEBSOCKET_STATE_THREE.result.expiration);
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_THREE.result)
    );
    expect(store).toEqual(expectedResult);
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_THREE.result)
    );
    expect(store).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    entity = entity
      .set(
        'sentflags',
        entity.get('sentflags').unshift(WEBSOCKET_STATE_FOUR.result.update)
      )
      .set('expiration', WEBSOCKET_STATE_FOUR.result.expiration);
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_FOUR.result)
    );
    expect(store).toEqual(expectedResult);
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_FOUR.result)
    );
    expect(store).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    entity = entity.set('expiration', WEBSOCKET_STATE_FIVE.result.expiration);
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_FIVE.result)
    );
    expect(store).toEqual(expectedResult);
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_FIVE.result)
    );
    expect(store).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    entity = entity
      .set(
        'sentflags',
        entity.get('sentflags').unshift(WEBSOCKET_STATE_SIX.result.update)
      )
      .set('expiration', WEBSOCKET_STATE_SIX.result.expiration);
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_SIX.result)
    );
    expect(store).toEqual(expectedResult);
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_SIX.result)
    );
    expect(store).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    entity = entity
      .set('sentflags', fromJS(WEBSOCKET_STATE_SEVEN.result.sentflags))
      .set('expiration', WEBSOCKET_STATE_SEVEN.result.expiration)
      .set('status', 'finished');
    expectedResult = store
      .setIn(['swaps', 'processingList'], fromJS([]))
      .setIn(['swaps', 'finishedList'], fromJS([uuid]))
      .setIn(['swaps', 'entities'], entities.set(uuid, entity));
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_SEVEN.result)
    );
    expect(store).toEqual(expectedResult);
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_SEVEN.result)
    );
    expect(store).toEqual(expectedResult);
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_SIX.result)
    );
    expect(store).toEqual(expectedResult);
    store = buyReducer(
      store,
      loadRecentSwapsDataFromWebsocket(WEBSOCKET_STATE_FIVE.result)
    );
    expect(store).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/reducers/loadRecentSwapsCoin', () => {
  const {
    uuid,
    tradeid,
    requestid,
    quoteid,
    expiration,
    bob,
    alice,
    basevalue,
    relvalue
  } = SWAP_STATE_ZERO;
  let store = initialState
    .setIn(['swaps', 'processingList'], fromJS([uuid]))
    .setIn(
      ['swaps', 'entities'],
      fromJS({
        [uuid]: {
          id: tradeid,
          uuid,
          requestid,
          quoteid,
          expiration,
          bob,
          alice,
          bobamount: basevalue,
          aliceamount: relvalue,
          sentflags: [],
          status: 'pending'
        }
      })
    );

  it('should handle the loadRecentSwapsCoin action correctly', () => {
    let entities = store.getIn(['swaps', 'entities']);
    let entity = entities.get(uuid);
    entity = entity
      .set('sentflags', fromJS(SWAP_STATE_ONE.sentflags))
      .set('expiration', SWAP_STATE_ONE.expiration)
      .set('requestid', SWAP_STATE_ONE.requestid)
      .set('quoteid', SWAP_STATE_ONE.quoteid)
      .set('bobamount', SWAP_STATE_ONE.srcamount)
      .set('aliceamount', SWAP_STATE_ONE.destamount);
    let expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    entity = entity
      .set('sentflags', fromJS(SWAP_STATE_TWO.sentflags))
      .set('expiration', SWAP_STATE_TWO.expiration)
      .set('requestid', SWAP_STATE_TWO.requestid)
      .set('quoteid', SWAP_STATE_TWO.quoteid)
      .set('bobamount', SWAP_STATE_TWO.srcamount)
      .set('aliceamount', SWAP_STATE_TWO.destamount);
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_TWO));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    entity = entity
      .set('sentflags', fromJS(SWAP_STATE_THREE.sentflags))
      .set('expiration', SWAP_STATE_THREE.expiration)
      .set('requestid', SWAP_STATE_THREE.requestid)
      .set('quoteid', SWAP_STATE_THREE.quoteid)
      .set('bobamount', SWAP_STATE_THREE.srcamount)
      .set('aliceamount', SWAP_STATE_THREE.destamount);
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_THREE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_TWO));
    expect(store).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    entity = entity
      .set('sentflags', fromJS(SWAP_STATE_FOUR.sentflags))
      .set('expiration', SWAP_STATE_FOUR.expiration)
      .set('requestid', SWAP_STATE_FOUR.requestid)
      .set('quoteid', SWAP_STATE_FOUR.quoteid)
      .set('bobamount', SWAP_STATE_FOUR.srcamount)
      .set('aliceamount', SWAP_STATE_FOUR.destamount);
    expectedResult = store.setIn(
      ['swaps', 'entities'],
      entities.set(uuid, entity)
    );
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FOUR));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_THREE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_TWO));
    expect(store).toEqual(expectedResult);

    entities = store.getIn(['swaps', 'entities']);
    entity = entities.get(uuid);
    entity = entity
      .set('sentflags', fromJS(SWAP_STATE_FIVE.sentflags))
      .set('expiration', SWAP_STATE_FIVE.expiration)
      .set('requestid', SWAP_STATE_FIVE.requestid)
      .set('quoteid', SWAP_STATE_FIVE.quoteid)
      .set('bobamount', SWAP_STATE_FIVE.srcamount)
      .set('aliceamount', SWAP_STATE_FIVE.destamount)
      .set('status', 'finished');
    expectedResult = store
      .setIn(['swaps', 'processingList'], fromJS([]))
      .setIn(['swaps', 'finishedList'], fromJS([uuid]))
      .setIn(['swaps', 'entities'], entities.set(uuid, entity));
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FIVE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_FOUR));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_ONE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_THREE));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadRecentSwapsCoin(SWAP_STATE_TWO));
    expect(store).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/reducers/loadBuyCoinSuccess', () => {
  const {
    uuid,
    tradeid,
    requestid,
    quoteid,
    expiration,
    bob,
    alice,
    basevalue,
    relvalue
  } = SWAP_STATE_ZERO;
  it('should handle the loadBuyCoinSuccess action correctly', () => {
    const list = initialState.getIn(['swaps', 'processingList']);
    const entities = initialState.getIn(['swaps', 'entities']);
    const expectedResult = initialState
      .setIn(['buying', 'loading'], true)
      .setIn(['buying', 'error'], false)
      .setIn(['swaps', 'currentSwap'], uuid)
      .setIn(['swaps', 'processingList'], list.push(uuid))
      .setIn(
        ['swaps', 'entities'],
        entities.set(
          uuid,
          fromJS({
            id: tradeid,
            uuid,
            requestid,
            quoteid,
            expiration,
            bob,
            alice,
            bobamount: basevalue,
            aliceamount: relvalue,
            sentflags: [],
            status: 'pending'
          })
        )
      );
    let store = buyReducer(initialState, loadBuyCoinSuccess(SWAP_STATE_ZERO));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, loadBuyCoinSuccess(SWAP_STATE_ZERO));
    expect(store).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/reducers/timeoutSwap', () => {
  const {
    uuid,
    tradeid,
    requestid,
    quoteid,
    expiration,
    bob,
    alice,
    basevalue,
    relvalue
  } = SWAP_STATE_ZERO;
  it('should handle the timeoutSwap action correctly', () => {
    const list = initialState.getIn(['swaps', 'processingList']);
    let store = initialState
      .setIn(['swaps', 'processingList'], list.push(uuid))
      .setIn(
        ['swaps', 'entities'],
        fromJS({
          [uuid]: {
            id: tradeid,
            uuid,
            requestid,
            quoteid,
            expiration,
            bob,
            alice,
            bobamount: basevalue,
            aliceamount: relvalue,
            sentflags: [],
            status: 'pending'
          }
        })
      );

    const expectedResult = store
      .setIn(['swaps', 'processingList'], fromJS([]))
      .setIn(['swaps', 'finishedList'], fromJS([uuid]))
      .setIn(
        ['swaps', 'entities'],
        fromJS({
          [uuid]: {
            id: tradeid,
            uuid,
            requestid,
            quoteid,
            expiration,
            bob,
            alice,
            bobamount: basevalue,
            aliceamount: relvalue,
            sentflags: [],
            error: {
              message: 'Timeout'
            },
            status: 'finished'
          }
        })
      );

    const payload = {
      id: tradeid,
      uuid,
      requestid,
      quoteid,
      bob,
      alice
    };
    store = buyReducer(store, timeoutSwap(payload));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, timeoutSwap(payload));
    expect(store).toEqual(expectedResult);
  });

  it('should not remove uuid in processingList', () => {
    const list = initialState.getIn(['swaps', 'processingList']);
    let store = initialState
      .setIn(['swaps', 'processingList'], list.push(uuid))
      .setIn(
        ['swaps', 'entities'],
        fromJS({
          [uuid]: {
            id: tradeid,
            uuid,
            requestid,
            quoteid,
            expiration,
            bob,
            alice,
            bobamount: basevalue,
            aliceamount: relvalue,
            sentflags: [],
            status: 'pending'
          }
        })
      );

    const expectedResult = store.setIn(
      ['swaps', 'finishedList'],
      fromJS(['uuid'])
    );

    const payload = {
      id: tradeid,
      uuid: 'uuid',
      requestid,
      quoteid,
      bob,
      alice
    };
    store = buyReducer(store, timeoutSwap(payload));
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, timeoutSwap(payload));
    expect(store).toEqual(expectedResult);
  });
});

describe('containers/BuyPage/reducers/makeANewSwap', () => {
  const {
    uuid,
    tradeid,
    requestid,
    quoteid,
    expiration,
    bob,
    alice,
    basevalue,
    relvalue
  } = SWAP_STATE_ZERO;
  it('should handle the makeANewSwap action correctly', () => {
    const list = initialState.getIn(['swaps', 'processingList']);
    let store = initialState
      .setIn(['swaps', 'processingList'], list.push(uuid))
      .setIn(
        ['swaps', 'entities'],
        fromJS({
          [uuid]: {
            id: tradeid,
            uuid,
            requestid,
            quoteid,
            expiration,
            bob,
            alice,
            bobamount: basevalue,
            aliceamount: relvalue,
            sentflags: [],
            status: 'pending'
          }
        })
      );

    const expectedResult = store
      .setIn(['buying', 'error'], false)
      .setIn(['buying', 'loading'], false)
      .setIn(['swaps', 'currentSwap'], null);

    store = buyReducer(store, makeANewSwap());
    expect(store).toEqual(expectedResult);
    store = buyReducer(store, makeANewSwap());
    expect(store).toEqual(expectedResult);
  });
});
