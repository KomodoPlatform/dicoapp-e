// @flow
import React from 'react';
// import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { Map } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import { makeSelectWithdrawModal } from './selectors';
import { closeWithdrawModal } from './actions';

const debug = require('debug')('dicoapp:containers:WalletPage:WithdrawModal');

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  onClose: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  withdrawModal: Map<*, *>
};

const styles = () => ({});

export class WithdrawModal extends React.PureComponent<Props> {
  render() {
    debug('render');
    const { classes, withdrawModal, onClose } = this.props;
    return (
      <SwipeableDrawer
        anchor="right"
        open={withdrawModal.get('open')}
        onClose={onClose}
      >
        <div tabIndex={0} role="button" className={classes.swapDetail__content}>
          WithdrawModal
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
  withdrawModal: makeSelectWithdrawModal()
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
