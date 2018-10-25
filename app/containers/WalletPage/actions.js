// @flow

import {
  LOAD_TRANSACTIONS,
  LOAD_TRANSACTION_SUCCESS,
  LOAD_TRANSACTIONS_SUCCESS,
  LOAD_TRANSACTIONS_ERROR,
  WITHDRAW_MODAL_OPEN,
  WITHDRAW_MODAL_CLOSE,
  DEPOSIT_MODAL_OPEN,
  DEPOSIT_MODAL_CLOSE
} from './constants';
import type { TransactionPayload } from './schema';

export function loadTransactions() {
  return {
    type: LOAD_TRANSACTIONS
  };
}

export function loadTransactionsSuccess() {
  return {
    type: LOAD_TRANSACTIONS_SUCCESS
  };
}

export function loadTransactionSuccess(transaction: Array<TransactionPayload>) {
  return {
    type: LOAD_TRANSACTION_SUCCESS,
    payload: {
      transaction
    }
  };
}

export function loadTransactionsError(message: string) {
  return {
    type: LOAD_TRANSACTIONS_ERROR,
    error: {
      message
    }
  };
}

export function openWithdrawModal() {
  return {
    type: WITHDRAW_MODAL_OPEN
  };
}

export function closeWithdrawModal() {
  return {
    type: WITHDRAW_MODAL_CLOSE
  };
}

export function openDepositModal() {
  return {
    type: DEPOSIT_MODAL_OPEN
  };
}

export function closeDepositModal() {
  return {
    type: DEPOSIT_MODAL_CLOSE
  };
}
