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

// import DialogTitle from '@material-ui/core/DialogTitle';
// import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import CloudOff from '@material-ui/icons/CloudOff';

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
  }
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

  renderCoin = () => <React.Fragment>renderCoin</React.Fragment>;

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
          {this.renderEmptyState()}
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
