// @flow
import React, { PureComponent } from 'react';
import classNames from 'classnames';
import QRCode from 'qrcode.react';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import LinearProgress from '@material-ui/core/LinearProgress';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';

import { required, requiredNumber } from '../../../components/Form/helper';
import validate from '../../../components/Form/validate';
import { getCoinIcon } from '../../../components/CryptoIcons';

import clipboardCopy from '../../../utils/clipboard-copy';

const debug = require('debug')('dicoapp:containers:WalletPage:Wallet');

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

const ValidationAmountInput = validate(TextInput, [requiredNumber, lessThan], {
  onChange: true
});

const ValidationAddressInput = validate(TextInput, [required, notSameAddress], {
  onChange: true
});

const styles = theme => ({
  column: {
    flexBasis: '33.33%'
  },
  details: {
    display: 'block'
  },
  hr: {
    marginBottom: 20
  },
  formItem: {
    margin: '0 0 17px 0',
    position: 'relative',
    width: '100%',
    maxWidth: 450
  },
  rightIcon: {
    top: 23
  },
  bitcoinContainer: {
    width: '100%'
  },
  bitcoinTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  bitcoinQRCodeContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'no-wrap',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%'
  },
  bitcoinQRCodeItem: {
    marginRight: 10
  },
  transactionsForm: {
    width: '100%',
    maxWidth: 450
  },
  rightLogo: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'no-wrap',
    alignItems: 'center'
  },
  coinName: {
    paddingLeft: 5
  },

  leftIcon: {
    marginRight: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },

  withdraw__button: {
    boxShadow: 'none'
  },

  withdraw__form: {
    // marginBottom: 20
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  data: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadWithdraw: Function
};

type State = {
  expanded: boolean
};

class Wallet extends PureComponent<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    };
    this.amountInput = React.createRef();
    this.addressInput = React.createRef();
  }

  getSnapshotBeforeUpdate(prevProps) {
    // eslint-disable-next-line react/destructuring-assignment
    const currData = this.props.data;
    const prevData = prevProps.data;
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
    const { dispatchLoadWithdraw, data } = this.props;
    const coin = data.get('coin');

    try {
      const amountInput = this.amountInput.current;
      const amount = await amountInput.value();

      const addressInput = this.addressInput.current;
      const address = await addressInput.value();

      dispatchLoadWithdraw({
        amount: Number(amount),
        address,
        coin
      });
    } catch (err) {
      debug(`handleWithdraw ${err.message}`);
    }
  };

  copyAddressToClipboard = async (evt: SyntheticInputEvent<>) => {
    evt.stopPropagation();
    const { data } = this.props;
    const address = data.get('address');
    clipboardCopy(address);
    // const success = clipboardCopy(address);
    // if (success) {
    // } else {
    // }
    evt.target.focus();
  };

  toggleExpansionPanel = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    this.setState(prevState => ({
      expanded: !prevState.expanded
    }));
  };

  render() {
    debug(`render`);

    const { classes, data } = this.props;
    const { expanded } = this.state;
    const loading = data.get('loading');
    const CIcon = getCoinIcon(data.get('coin'));

    return (
      <Grid container spacing={0}>
        <Grid item xs={12} className={classes.containerSection}>
          <ExpansionPanel expanded={expanded}>
            <ExpansionPanelSummary
              classes={{
                expandIcon: classes.rightIcon
              }}
              expandIcon={
                <ExpandMoreIcon onClick={this.toggleExpansionPanel} />
              }
            >
              <div className={classes.bitcoinContainer}>
                <div className={classes.bitcoinTitle}>
                  <div className={classes.rightLogo}>
                    {CIcon}
                    <div className={classes.coinName}>{data.get('coin')}</div>
                  </div>
                  <div>
                    {data.get('balance')} {data.get('coin')}
                  </div>
                </div>
                <div className={classes.bitcoinQRCodeContainer}>
                  <div className={classes.bitcoinQRCodeItem}>
                    <Typography variant="subheading" gutterBottom>
                      <FormattedMessage id="dicoapp.containers.Wallet.deposit_address">
                        {(...content) => content}
                      </FormattedMessage>
                    </Typography>
                    <Typography variant="title" gutterBottom>
                      {data.get('address')}
                    </Typography>
                    <Button
                      size="small"
                      color="primary"
                      onClick={this.copyAddressToClipboard}
                    >
                      <FileCopyIcon
                        className={classNames(
                          classes.leftIcon,
                          classes.iconSmall
                        )}
                      />
                      <FormattedMessage id="dicoapp.containers.Wallet.copy_address">
                        {(...content) => content}
                      </FormattedMessage>
                    </Button>
                  </div>
                  <QRCode value={data.get('address')} />
                </div>
              </div>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails className={classes.details}>
              <Divider className={classes.hr} />

              {loading && <LinearProgress className={classes.hr} />}

              <Typography variant="button" gutterBottom>
                Withdraw {data.get('coin')}
              </Typography>
              <Typography variant="body1" gutterBottom>
                Available: {data.get('balance')} {data.get('coin')}
              </Typography>
              <form className={classes.withdraw__form}>
                <ValidationAmountInput
                  id="amount"
                  label="Amount to withdraw"
                  margin="normal"
                  balance={data.get('balance')}
                  className={classes.formItem}
                  ref={this.amountInput}
                  disabled={loading}
                />

                <ValidationAddressInput
                  id="address"
                  label="Withdraw to address"
                  margin="normal"
                  className={classes.formItem}
                  address={data.get('address')}
                  ref={this.addressInput}
                  disabled={loading}
                />

                <br />

                <Button
                  variant="contained"
                  color="primary"
                  className={classes.withdraw__button}
                  onClick={this.handleWithdraw}
                  disabled={loading}
                >
                  Withdraw
                </Button>
              </form>
              {/* <Divider className={classes.hr} /> */}
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    );
  }
}

Wallet.displayName = 'Wallet';

export default withStyles(styles)(Wallet);
