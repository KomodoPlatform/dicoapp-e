// @flow

// https://github.com/paularmstrong/normalizr
// import { normalize, schema } from 'normalizr';

type TransactionPayload = {
  coin: string,
  height: number,
  tx_hash: string
};

type CoinTransactionsLoadPayload = {
  result: string,
  status: string,
  coin: string,
  queueId: number
};

type CoinTransactionsSuccessPayload = {
  queueId: number,
  coin: string,
  tx: Array<TransactionPayload>
};

type ErrorPayload = {
  context: {
    action: string, // eg: COIN_TRANSACTIONS_LOAD
    params: Array<*>
  },
  type: string, // eg: ApiError
  url: string, // eg: https://127.0.0.1/kmd/transactions.json
  message: string
};

// eslint-disable-next-line import/prefer-default-export
export type {
  TransactionPayload,
  CoinTransactionsLoadPayload,
  CoinTransactionsSuccessPayload,
  ErrorPayload
};
