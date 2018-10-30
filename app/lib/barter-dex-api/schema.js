// @flow

type CancelRequest = {
  userpass: string,
  uuid: string
};

type StateType = {
  userpass: string | null
};

type OptionsType = {
  useQueue: boolean
};

export const DEFAULT_OPTION = {
  useQueue: false
};

// eslint-disable-next-line import/prefer-default-export
export type { CancelRequest, StateType, OptionsType };
