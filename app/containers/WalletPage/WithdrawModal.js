// @flow
import React from 'react';
// import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import CloudOff from '@material-ui/icons/CloudOff';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import {
  makeSelectWithdrawModal,
  makeSelectCoinWithdrawModal
} from './selectors';
import { closeWithdrawModal } from './actions';

const debug = require('debug')('dicoapp:containers:WalletPage:WithdrawModal');

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  onClose: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  withdrawModal: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  coin: Map<*, *> | null
};

const styles = () => ({
  withdrawmodal__emptystate: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 25
  },

  withdrawmodal__iconemptystate: {
    fontSize: 50
  },

  withdrawmodal__content: {
    width: 500,
    textAlign: 'center'
  },

  withdrawmodal__dialogTitle: {}
});

export class WithdrawModal extends React.PureComponent<Props> {
  renderEmptyState = () => {
    const { classes } = this.props;
    return (
      <div className={classes.withdrawmodal__emptystate}>
        <Typography variant="title" gutterBottom>
          <CloudOff className={classes.withdrawmodal__iconemptystate} />
        </Typography>
        <Typography variant="subheading" gutterBottom>
          No data found. Please select an asset.
        </Typography>
      </div>
    );
  };

  renderCoin = () => {
    const { classes, coin } = this.props;

    return (
      <React.Fragment>
        <DialogTitle
          id="withdraw-modal-title"
          className={classes.withdrawmodal__dialogTitle}
        >
          Withdraw
        </DialogTitle>
        <DialogContent>
          <Typography variant="button" gutterBottom>
            Withdraw {coin.get('coin')}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Available: {coin.get('balance')} {coin.get('coin')}
          </Typography>

          <List>
            <ListItem className={classes.swapDetail__listitem}>
              <ListItemText
                primary={
                  <Typography variant="caption" gutterBottom>
                    DATE
                  </Typography>
                }
              />
              <ListItemSecondaryAction
                className={classes.swapDetail__ListItemRight}
              >
                <Typography variant="caption" gutterBottom>
                  1231
                </Typography>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
        </DialogContent>
      </React.Fragment>
    );
  };

  render() {
    debug('render');
    const { classes, withdrawModal, coin, onClose } = this.props;
    return (
      <SwipeableDrawer
        anchor="right"
        open={withdrawModal.get('open')}
        onClose={onClose}
      >
        <div
          tabIndex={0}
          role="button"
          className={classes.withdrawmodal__content}
        >
          {!coin && this.renderEmptyState()}
          {coin && this.renderCoin()}
        </div>
      </SwipeableDrawer>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    onClose: () => dispatch(closeWithdrawModal())
  };
}

const mapStateToProps = createStructuredSelector({
  withdrawModal: makeSelectWithdrawModal(),
  coin: makeSelectCoinWithdrawModal()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const WithdrawModalWapper = compose(
  withConnect,
  withStyles(styles)
)(WithdrawModal);

export default WithdrawModalWapper;
