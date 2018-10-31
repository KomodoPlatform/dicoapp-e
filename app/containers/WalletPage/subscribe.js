import { loadCoinTransactionsSuccess } from './actions';
import { makeSelectTransactionsQueueids } from './selectors';

export default async function walletSubscribe(
  { result, queueid },
  dispatch,
  getState
) {
  if (queueid > 0) {
    const selectTransactionsQueueids = makeSelectTransactionsQueueids();
    const queueids = selectTransactionsQueueids(getState());
    const coin = queueids.get(`${queueid}`);
    console.log(coin, 'walletSubscribe');
    if (coin) {
      // FIXME this case
      // {error: "timeout"}

      // sort
      let data = result.sort((a, b) => b.height - a.height);

      // only take 10 records
      // data = data.slice(0, 10);

      // add coin symbol
      data = data.map(e => {
        e.coin = coin;
        return e;
      });

      dispatch(
        loadCoinTransactionsSuccess({
          queueId: queueid,
          coin,
          tx: data
        })
      );
    }
  }
}
