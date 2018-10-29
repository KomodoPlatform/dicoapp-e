// @flow
// import type { EndpointType, CancelRequest } from './schema';
import httpprovider from './http-provider';
import addServerFactory from './add-server';
import balanceFactory from './balance';
import buyFactory from './buy';
import getendpointFactory from './get-endpoint';
import getfeeFactory from './getfee';
import isReadyFactory from './is-ready';
import listTransactionsFactory from './list-transactions';
import listunspentFactory from './listunspent';
import orderbookFactory from './orderbook';
import loginFactory from './login';
import recentswapsFactory from './recentswaps';
import sendRawTransactionFactory from './send-raw-transaction';
import swapstatusFactory from './swapstatus';
import withdrawFactory from './withdraw';

// const debug = require('debug')('dicoapp:utils:barter-dex-api');

// eslint-disable-next-line flowtype/no-weak-types
function BarterDexAPI(): Object {
  const state = {
    userpass: null
  };

  return Object.assign(
    {
      setUserpass(userpass: string) {
        state.userpass = userpass;
      },
      getUserpass() {
        return state.userpass;
      },
      resetUserpass() {
        state.userpass = null;
      }
    },
    httpprovider(state),
    addServerFactory(state),
    balanceFactory(state),
    buyFactory(state),
    getendpointFactory(state),
    getfeeFactory(state),
    isReadyFactory(state),
    listTransactionsFactory(state),
    listunspentFactory(state),
    orderbookFactory(state),
    loginFactory(state),
    recentswapsFactory(state),
    sendRawTransactionFactory(state),
    swapstatusFactory(state),
    withdrawFactory(state)
  );
}

let api = null;

function setup() {
  if (api) return api;

  api = BarterDexAPI();

  return api;
}

export default setup();
