// @flow
import React, { PureComponent } from 'react';
import classNames from 'classnames';
// import QRCode from 'qrcode.react';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import LinearProgress from '@material-ui/core/LinearProgress';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import FileCopyIcon from '@material-ui/icons/FileCopy';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
// import Divider from '@material-ui/core/Divider';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import PaymentIcon from '@material-ui/icons/Payment';
import CloudDownloadIcon from '@material-ui/icons/CloudDownload';

import { required, requiredNumber } from '../../../components/Form/helper';
import validate from '../../../components/Form/validate';
import { getCoinIcon } from '../../../components/CryptoIcons';
import clipboardCopy from '../../../utils/clipboard-copy';
import { covertSymbolToName } from '../../../utils/coin';

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

// eslint-disable-next-line no-unused-vars
const ValidationAmountInput = validate(TextInput, [requiredNumber, lessThan], {
  onChange: true
});

// eslint-disable-next-line no-unused-vars
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
  },

  actions: {
    display: 'flex'
  },

  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    }),
    marginLeft: 'auto',
    [theme.breakpoints.up('sm')]: {
      marginRight: -8
    }
  },

  expandOpen: {
    transform: 'rotate(180deg)'
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
    // const loading = data.get('loading');
    const CIcon = getCoinIcon(data.get('coin'));

    console.log(data, data.toJS());

    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {CIcon}
            </Avatar>
          }
          // action={
          //   <IconButton>
          //     <MoreVertIcon />
          //   </IconButton>
          // }
          title={data.get('coin')}
          subheader={covertSymbolToName(data.get('coin'))}
        />
        <CardContent>
          <Typography variant="title">{data.get('address')}</Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
          </Typography>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <Button size="small" color="primary">
            <PaymentIcon
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            Deposit
          </Button>
          <Button size="small" color="primary">
            <CloudDownloadIcon
              className={classNames(classes.leftIcon, classes.iconSmall)}
            />
            Withdraw
          </Button>
          <IconButton
            className={classNames(classes.expand, {
              [classes.expandOpen]: expanded
            })}
            onClick={this.toggleExpansionPanel}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>123</CardContent>
        </Collapse>
      </Card>
    );
  }
}

Wallet.displayName = 'Wallet';

export default withStyles(styles)(Wallet);
