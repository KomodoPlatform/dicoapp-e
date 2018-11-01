// @flow
import React from 'react';
import { shell } from 'electron';
import type { List } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';

import explorer from '../../../lib/explorer';

const styles = () => ({
  table: {
    maxHeight: 450
  },

  th: {
    color: '#555555',
    fontSize: 15
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  data: List<*>
};

class TransactionsTable extends React.PureComponent<Props> {
  onClickTranstactions = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    // https://github.com/electron/electron/blob/master/docs/api/shell.md#shellopenexternalurl
    shell.openExternal(evt.target.href);
  };

  renderRecord = (t, k) => {
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

  render = () => {
    const { classes, data } = this.props;

    return (
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
        <TableBody>{data.map(this.renderRecord)}</TableBody>
      </Table>
    );
  };
}

export default withStyles(styles)(TransactionsTable);
