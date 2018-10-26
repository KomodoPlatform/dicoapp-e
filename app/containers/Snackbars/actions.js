// @flow

import { SNACKBARS_OPEN, SNACKBARS_CLOSE } from './constants';

export function openSnackbars() {
  return {
    type: SNACKBARS_OPEN
  };
}

export function closeSnackbars() {
  return {
    type: SNACKBARS_CLOSE
  };
}
