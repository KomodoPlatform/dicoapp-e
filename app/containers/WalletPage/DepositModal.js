// @flow
import React from 'react';
import QRCode from 'qrcode.react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { Map } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import CloudOff from '@material-ui/icons/CloudOff';

import { getCoinIcon } from '../../components/CryptoIcons';
import Or from './components/Or';
import clipboardCopy from '../../utils/clipboard-copy';
import { openSnackbars } from '../Snackbars/actions';
import {
  makeSelectDepositModal,
  makeSelectCoinDepositModal
} from './selectors';

import { closeDepositModal } from './actions';

const debug = require('debug')('dicoapp:containers:WalletPage:DepositModal');

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  onClose: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  depositModal: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  coin: Map<*, *> | null,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchOpenSnackbars: Function
};

const styles = theme => ({
  depositModal__content: {
    textAlign: 'center',
    width: 500
  },

  depositModal__contentTitle: {
    marginBottom: 20
  },

  depositModal__listItem: {
    paddingRight: 0,
    paddingLeft: 0
  },

  depositModal__listItemSecondaryAction: {
    right: 0
  },

  depositModal__warningPlate: {
    textAlign: 'left',
    padding: 12,
    border: `1px dashed ${theme.colors.warning}`,
    borderRadius: 4,
    width: '100%',
    marginBottom: 20
  },

  depositModal__dialogTitle: {
    padding: '24px 24px 5px'
  },

  depositModal__emptystate: {
    textAlign: 'center',
    fontSize: 25
  }
});

export class DepositModal extends React.PureComponent<Props> {
  renderEmptyState = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <DialogTitle
          id="deposit-modal-title"
          className={classes.depositModal__dialogTitle}
        >
          Deposit
        </DialogTitle>
        <DialogContent className={classes.depositModal__emptystate}>
          <Typography variant="title" gutterBottom>
            <CloudOff />
          </Typography>
          <Typography variant="subheading" gutterBottom>
            No data found. Please select an asset.
          </Typography>
        </DialogContent>
      </React.Fragment>
    );
  };

  copyAddressToClipboard = async (evt: SyntheticInputEvent<>) => {
    evt.stopPropagation();
    const { coin, dispatchOpenSnackbars } = this.props;
    const address = coin.get('smartaddress');
    clipboardCopy(address);
    dispatchOpenSnackbars('Copied');
    evt.target.focus();
  };

  renderQRCode = () => {
    const { classes, coin } = this.props;
    const CIcon = getCoinIcon(coin.get('coin'));

    return (
      <React.Fragment>
        <DialogTitle
          id="deposit-modal-title"
          className={classes.depositModal__dialogTitle}
        >
          Deposit
        </DialogTitle>
        <DialogContent className={classes.depositModal__content}>
          <List>
            <ListItem
              classes={{
                secondaryAction: classes.depositModal__listItem
              }}
            >
              <ListItemText primary="Asset" secondary={coin.get('coin')} />
              <ListItemSecondaryAction
                className={classes.depositModal__listItemSecondaryAction}
              >
                <IconButton aria-label="coin-icon">{CIcon}</IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <ListItem
              classes={{
                secondaryAction: classes.depositModal__listItem
              }}
            >
              <ListItemText
                primary="Address"
                secondary={coin.get('smartaddress')}
              />
              <ListItemSecondaryAction
                className={classes.depositModal__listItemSecondaryAction}
              >
                <IconButton
                  aria-label="copy-address"
                  onClick={this.copyAddressToClipboard}
                >
                  <FileCopyIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <div className={classes.depositModal__warningPlate}>
            <Typography variant="button" gutterBottom>
              Send only {coin.get('coin')} to this deposit address.
            </Typography>
            <Typography gutterBottom>
              Sending tokens or any other currency to this address will result
              in the permanent loss of your deposit.
            </Typography>
          </div>
          <Or />
          <Typography
            variant="body2"
            gutterBottom
            className={classes.depositModal__contentTitle}
          >
            Scan QR Code
          </Typography>
          <QRCode value={coin.get('smartaddress')} size={150} />
        </DialogContent>
      </React.Fragment>
    );
  };

  render() {
    debug('render');
    const { depositModal, coin, onClose } = this.props;
    return (
      <Dialog
        tabIndex={0}
        aria-labelledby="deposit-modal-title"
        open={depositModal.get('open')}
        onClose={onClose}
      >
        {!coin && this.renderEmptyState()}
        {coin && this.renderQRCode()}
      </Dialog>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    onClose: () => dispatch(closeDepositModal()),
    dispatchOpenSnackbars: (message: string) => dispatch(openSnackbars(message))
  };
}

const mapStateToProps = createStructuredSelector({
  depositModal: makeSelectDepositModal(),
  coin: makeSelectCoinDepositModal()
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
