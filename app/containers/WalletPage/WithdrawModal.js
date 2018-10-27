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
import TextField from '@material-ui/core/TextField';

import { required, requiredNumber } from '../../components/Form/helper';
import BuyButton from '../../components/BuyButton';
import validate from '../../components/Form/validate';
import { loadWithdraw } from '../App/actions';
import {
  makeSelectWithdrawModal,
  makeSelectCoinWithdrawModal
} from './selectors';
import { closeWithdrawModal } from './actions';

const debug = require('debug')('dicoapp:containers:WalletPage:WithdrawModal');

export const lessThan = (value: mixed, props: mixed) =>
  new Promise((resolve, reject) => {
    const { balance } = props;
    const n = Number(value);
    const b = Number(balance);
    if (n >= b) {
      return reject(new Error('Value is large than balance'));
    }
    return resolve(true);
  });

export const notSameAddress = (value: mixed, props: mixed) =>
  new Promise((resolve, reject) => {
    const { address } = props;
    if (address.trim() === value.trim()) {
      return reject(new Error('You can not withdraw same address'));
    }
    return resolve(true);
  });

// eslint-disable-next-line react/prop-types
const TextInput = ({ onChange, value, error, isError, ...props }) => (
  <TextField
    {...props}
    error={isError}
    helperText={error}
    value={value}
    onChange={onChange}
  />
);

// eslint-disable-next-line no-unused-vars
const ValidationAmountInput = validate(TextInput, [requiredNumber, lessThan], {
  onChange: true
});

// eslint-disable-next-line no-unused-vars
const ValidationAddressInput = validate(TextInput, [required, notSameAddress], {
  onChange: true
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  onClose: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  withdrawModal: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadWithdraw: Function,
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

  withdrawmodal__dialogTitle: {},

  withdraw__button: {
    boxShadow: 'none'
  },

  formItem: {
    margin: '0 0 17px 0',
    position: 'relative',
    width: '100%',
    maxWidth: 450
  }
});

export class WithdrawModal extends React.PureComponent<Props> {
  constructor(props) {
    super(props);

    this.amountInput = React.createRef();
    this.addressInput = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps) {
    // eslint-disable-next-line react/destructuring-assignment
    const currData = this.props.coin;
    const prevData = prevProps.coin;
    const currLoading = currData.get('loading');
    const prevLoading = prevData.get('loading');
    const currError = currData.get('error');
    return {
      done: currLoading === false && prevLoading === true && currError === false
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (snapshot && snapshot.done) {
      // reset input
      const amountInput = this.amountInput.current;
      const addressInput = this.addressInput.current;
      amountInput.reset();
      addressInput.reset();
    }
  }

  handleWithdraw = async (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { dispatchLoadWithdraw, coin } = this.props;

    try {
      const addressInput = this.addressInput.current;
      const address = await addressInput.value();

      const amountInput = this.amountInput.current;
      const amount = await amountInput.value();

      dispatchLoadWithdraw({
        amount: Number(amount),
        address,
        coin: coin.get('coin')
      });
    } catch (err) {
      debug(`handleWithdraw ${err.message}`);
    }
  };

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
    const loading = coin.get('loading');

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

          <form className={classes.withdraw__form}>
            <ValidationAddressInput
              id="address"
              label="Withdraw to address"
              margin="normal"
              className={classes.formItem}
              address={coin.get('address')}
              ref={this.addressInput}
              disabled={loading}
            />

            <ValidationAmountInput
              id="amount"
              label="Amount to withdraw"
              margin="normal"
              balance={coin.get('balance')}
              className={classes.formItem}
              ref={this.amountInput}
              disabled={loading}
            />

            <br />

            <BuyButton
              variant="contained"
              color="primary"
              className={classes.withdraw__button}
              onClick={this.handleWithdraw}
              disabled={loading}
            >
              Withdraw
            </BuyButton>
          </form>
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
    onClose: () => dispatch(closeWithdrawModal()),
    dispatchLoadWithdraw: (payload: {
      amount: number,
      address: string,
      coin: string
    }) => dispatch(loadWithdraw(payload))
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
