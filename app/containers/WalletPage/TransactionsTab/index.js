// @flow
import React from 'react';
import type { List } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CachedIcon from '@material-ui/icons/Cached';
import {
  makeSelectTransactionsLoading,
  makeSelectTransactionsError,
  makeSelectLatestTransactions
} from '../selectors';
import { loadTransactions, loadTransactionsLoop } from '../actions';
import TransactionsTable from './TransactionsTable';

const debug = require('debug')('dicoapp:containers:WalletPage:TransactionsTab');

const styles = () => ({
  containerSection: {
    position: 'relative',
    paddingBottom: 30
  },

  btns: {
    top: 8,
    right: 8,
    display: 'flex',
    position: 'absolute'
  }
});

type Props = {
  loading: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  error: boolean | Object,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadTransactions: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadTransactionsLoop: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  transactions: List<*>
};

class TransactionsTab extends React.PureComponent<Props> {
  componentDidMount = () => {
    const { dispatchLoadTransactionsLoop } = this.props;
    dispatchLoadTransactionsLoop();
  };

  onClickReloadTranstactions = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchLoadTransactions } = this.props;
    dispatchLoadTransactions();
  };

  render() {
    debug(`render`);

    const { loading, classes, error, transactions } = this.props;

    return (
      <Grid container spacing={12}>
        <Grid item xs={12} className={classes.containerSection}>
          <div className={classes.btns}>
            <IconButton
              disabled={loading}
              onClick={this.onClickReloadTranstactions}
            >
              <CachedIcon />
            </IconButton>
          </div>
          {error && (
            <SnackbarContent
              // className={classNames(classes[variant], className)}
              aria-describedby="client-snackbar"
              message={error.message}
            />
          )}
          <TransactionsTable data={transactions} />
        </Grid>
      </Grid>
    );
  }
}

TransactionsTab.displayName = 'Transactions';

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchLoadTransactions: () => dispatch(loadTransactions()),
    dispatchLoadTransactionsLoop: () => dispatch(loadTransactionsLoop())
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectTransactionsLoading(),
  error: makeSelectTransactionsError(),
  transactions: makeSelectLatestTransactions()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(TransactionsTab);
