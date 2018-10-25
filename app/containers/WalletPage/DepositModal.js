// @flow
import React from 'react';
// import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import { makeSelectDepositModal } from './selectors';
import { closeDepositModal } from './actions';

const debug = require('debug')('dicoapp:containers:WalletPage:DepositModal');

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  onClose: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  depositModal: Map<*, *>
};

const styles = () => ({});

export class DepositModal extends React.PureComponent<Props> {
  render() {
    debug('render');
    const { classes, depositModal, onClose } = this.props;
    return (
      <Dialog
        aria-labelledby="deposit-modal-title"
        open={depositModal.get('open')}
        onClose={onClose}
      >
        <DialogTitle id="deposit-modal-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <div
            tabIndex={0}
            role="button"
            className={classes.swapDetail__content}
          >
            DepositModal Wapper
          </div>
        </DialogContent>
      </Dialog>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    onClose: () => dispatch(closeDepositModal())
  };
}

const mapStateToProps = createStructuredSelector({
  depositModal: makeSelectDepositModal()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const DepositModalWapper = compose(
  withConnect,
  withStyles(styles)
)(DepositModal);

export default DepositModalWapper;
