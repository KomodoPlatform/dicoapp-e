/**
{
	"queueid": 10,
	"result": [{
		"tx_hash": "d5bbcbace5c21c0317f29e7a43dbce7540f34dd5872e74d9e47fb6417c74bfe0",
		"height": 16099
	}, {
		"tx_hash": "8de739b6e1d065a370cb863ebb3798ac6143a80ea58152def783ed68bcfa5c1b",
		"height": 17670
	}, {
		"tx_hash": "ac87f71d5d67d66b5201bb75146f3c4d7558c79d907d35603ba44f242d2146ef",
		"height": 26807
	}, {
		"tx_hash": "8fe21901c37c49b977b7468edac6956c33b5da7b17f8444e96b946f038a3f422",
		"height": 113219
	}]
}
*/
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
    const coin = queueids.get(queueid);
    if (coin) {
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
