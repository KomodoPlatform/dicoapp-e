// @flow
import React, { PureComponent } from 'react';
import { shell } from 'electron';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CachedIcon from '@material-ui/icons/Cached';
import explorer from '../../../lib/explorer';
import {
  makeSelectTransactionsLoading,
  makeSelectTransactionsError,
  makeSelectTransactionsList,
  makeSelectTransactionsEntities
} from '../selectors';
import { loadTransactions } from '../actions';

const debug = require('debug')('dicoapp:containers:WalletPage:Transactions');

const styles = () => ({
  containerSection: {
    position: 'relative',
    paddingBottom: 30
  },

  table: {
    maxHeight: 450
  },

  btns: {
    top: 8,
    right: 8,
    display: 'flex',
    position: 'absolute'
  },

  th: {
    color: '#555555',
    fontSize: 15
  }
});

let idInterval = null;
const LOAD_TRANSACTION_TIME = 90000;

type Props = {
  loading: boolean,
  // eslint-disable-next-line flowtype/no-weak-types
  error: boolean | Object,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  list: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  entities: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadTransactions: Function
};

class Transactions extends PureComponent<Props> {
  componentDidMount = () => {
    debug('watch transactions');

    const { dispatchLoadTransactions } = this.props;
    if (idInterval) {
      clearInterval(idInterval);
      idInterval = null;
    }
    idInterval = setInterval(() => {
      dispatchLoadTransactions();
    }, LOAD_TRANSACTION_TIME);

    dispatchLoadTransactions();
  };

  componentWillUnmount = () => {
    if (idInterval) {
      clearInterval(idInterval);
      idInterval = null;
    }
  };

  onClickReloadTranstactions = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchLoadTransactions } = this.props;
    dispatchLoadTransactions();
  };

  onClickTranstactions = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    // https://github.com/electron/electron/blob/master/docs/api/shell.md#shellopenexternalurl
    shell.openExternal(evt.target.href);
  };

  renderRecord = (v, k) => {
    const { entities } = this.props;
    const t = entities.get(v);
    if (!t) return null;
    const linkExplorer = explorer.tx(t.get('tx_hash'), t.get('coin'));
    return (
      <TableRow key={t.get('tx_hash')}>
        <TableCell>{k + 1}</TableCell>
        <TableCell>{t.get('coin')}</TableCell>
        <TableCell>{t.get('height')}</TableCell>
        <TableCell>
          {/* eslint-disable-next-line react/jsx-no-target-blank */}
          {linkExplorer && (
            <a
              style={{ color: '#000' }}
              href={linkExplorer}
              // target="_blank"
              // rel="noopener noreferrer"
              onClick={this.onClickTranstactions}
            >
              {t.get('tx_hash')}
            </a>
          )}
          {!linkExplorer && t.get('tx_hash')}
        </TableCell>
      </TableRow>
    );
  };

  render() {
    debug(`render`);

    const { loading, classes, list, error } = this.props;

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
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell className={classes.th}>#</TableCell>
                <TableCell className={classes.th}>
                  <FormattedMessage id="dicoapp.containers.Wallet.last_transactions_coin">
                    {(...content) => content}
                  </FormattedMessage>
                </TableCell>
                <TableCell className={classes.th}>
                  <FormattedMessage id="dicoapp.containers.Wallet.last_transactions_blockheight">
                    {(...content) => content}
                  </FormattedMessage>
                </TableCell>
                <TableCell className={classes.th}>
                  <FormattedMessage id="dicoapp.containers.Wallet.last_transactions_transactionid">
                    {(...content) => content}
                  </FormattedMessage>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{list && list.map(this.renderRecord)}</TableBody>
          </Table>
        </Grid>
      </Grid>
    );
  }
}

Transactions.displayName = 'Transactions';

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchLoadTransactions: () => dispatch(loadTransactions())
  };
}

const mapStateToProps = createStructuredSelector({
  loading: makeSelectTransactionsLoading(),
  error: makeSelectTransactionsError(),
  list: makeSelectTransactionsList(),
  entities: makeSelectTransactionsEntities()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(Transactions);
