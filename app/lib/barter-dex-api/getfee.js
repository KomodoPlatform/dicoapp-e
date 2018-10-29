// @flow

// https://docs.komodoplatform.com/barterDEX/barterDEX-API.html#getfee

type GetFeeType = {
  coin: string
};

// export default function getFeeFactory(state: StateType) {
export default function getFeeFactory() {
  return {
    getfee(params: GetFeeType) {
      const serverparams = Object.assign({}, params, {
        method: 'getfee'
      });
      return this.privateCall(serverparams);
    }
  };
}
