// @flow
import React from 'react';
// import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import type { Map } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import Grid from '@material-ui/core/Grid';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Divider from '@material-ui/core/Divider';
import CloudOff from '@material-ui/icons/CloudOff';

import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
// eslint-disable-next-line import/named
import { formatDate } from '../../lib/date-format';
import { getCoinIcon } from '../../components/CryptoIcons';
import { STATE_SWAPS } from './constants';
import { closeDetailModal } from './actions';
import {
  makeSelectSwapDetailModal,
  makeSelectSwapInDetailModal
} from './selectors';
import CoinSelectable from './components/CoinSelectable';
import BuyButton from './components/BuyButton';

const debug = require('debug')('dicoapp:containers:BuyPage:SwapDetailModal');

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  onClose: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  detailModal: Map<*, *>,
  // eslint-disable-next-line flowtype/no-weak-types
  swap: Map<*, *>
};

const styles = theme => ({
  swapDetail__content: {
    width: 500,
    textAlign: 'center'
  },

  amountform: {
    width: '50%'
  },

  amountform__item: {
    width: '100%'
  },

  amountform__itemCenter: {
    textAlign: 'center'
  },

  amountform__switchBtn: {
    position: 'absolute',
    textAlign: 'center',
    // top: '20%',
    top: 90,
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 25,
    width: 100
  },

  swapform_button: {
    margin: '0 auto'
  },

  swapDetail__container: {
    position: 'relative'
  },

  swapDetail__listitem: {
    paddingLeft: 0,
    paddingRight: 0
  },

  swapDetail__divider: {
    width: '35%',
    margin: '0 auto'
  },

  swapDetail__success: {
    color: theme.colors.success
  },

  swapDetail__danger: {
    color: theme.colors.danger
  },

  swapform__iconemptystate: {
    fontSize: 50
  },

  swapform__emptystate: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 25
  },

  swapform__uppercase: {
    textTransform: 'uppercase'
  }
});

export class SwapDetail extends React.PureComponent<Props> {
  renderNotFound = () => {
    const { classes } = this.props;
    return (
      <div className={classes.swapform__emptystate}>
        <Typography variant="title" gutterBottom>
          <CloudOff className={classes.swapform__iconemptystate} />
        </Typography>
        <Typography variant="subheading" gutterBottom>
          No data found. Please start making a swap.
        </Typography>
      </div>
    );
  };

  renderSwap = () => {
    const { swap, classes, onClose } = this.props;
    return (
      <React.Fragment>
        <CardHeader
          title={
            <Typography variant="title" gutterBottom>
              Detail Swap
            </Typography>
          }
          subheader={
            <Typography variant="caption" gutterBottom>
              {swap.get('uuid')}
            </Typography>
          }
        />
        <CardContent>
          <Grid
            container
            spacing={24}
            className={classes.swapDetail__container}
          >
            <Grid item xs={6} className={classes.amountform__itemCenter}>
              <CoinSelectable
                className={classes.swapform_button}
                icon={getCoinIcon(swap.get('alice'))}
                title="Deposit"
                subTitle={
                  <span className={classes.swapDetail__danger}>
                    {swap.get('aliceamount')} {swap.get('alice')}
                  </span>
                }
              />
            </Grid>
            <SwapHorizIcon className={classes.amountform__switchBtn} />
            <Grid item xs={6} className={classes.amountform__itemCenter}>
              <CoinSelectable
                className={classes.swapform_button}
                icon={getCoinIcon(swap.get('bob'))}
                title="Receive"
                subTitle={
                  <span className={classes.swapDetail__success}>
                    {swap.get('bobamount')} {swap.get('bob')}
                  </span>
                }
              />
            </Grid>
            <Grid item xs={12} className={classes.amountform__itemCenter}>
              <Typography variant="body2" gutterBottom>
                Step {swap.get('sentflags').size + 1}
                /6: {STATE_SWAPS[swap.get('sentflags').size]}
              </Typography>
              <LinearProgress
                color="primary"
                variant="determinate"
                value={swap.get('sentflags').size * 20}
              />
            </Grid>
            <Grid item xs={12} className={classes.amountform__itemCenter}>
              <List>
                <ListItem className={classes.swapDetail__listitem}>
                  <ListItemText
                    primary={
                      <Typography variant="caption" gutterBottom>
                        DATE
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="caption" gutterBottom>
                      {formatDate(
                        swap.get('expiration') * 1000,
                        'yyyy-MM-dd HH:mm:ss'
                      )}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem className={classes.swapDetail__listitem}>
                  <ListItemText
                    primary={
                      <Typography variant="caption" gutterBottom>
                        TO
                      </Typography>
                    }
                  />
                </ListItem>
                <Divider className={classes.swapDetail__divider} />
                <ListItem className={classes.swapDetail__listitem}>
                  <ListItemText
                    primary={
                      <Typography variant="caption" gutterBottom>
                        MY FEE
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="caption" gutterBottom>
                      {swap.getIn(['myfee', 'value'])}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem className={classes.swapDetail__listitem}>
                  <ListItemText
                    primary={
                      <Typography variant="caption" gutterBottom>
                        BOB DEPOSIT
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="caption" gutterBottom>
                      {swap.getIn(['bobdeposit', 'value'])}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem className={classes.swapDetail__listitem}>
                  <ListItemText
                    primary={
                      <Typography variant="caption" gutterBottom>
                        ALICE PAYMENT
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="caption" gutterBottom>
                      {swap.getIn(['alicepayment', 'value'])}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem className={classes.swapDetail__listitem}>
                  <ListItemText
                    primary={
                      <Typography variant="caption" gutterBottom>
                        BOB PAYMENT
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="caption" gutterBottom>
                      {swap.getIn(['bobpayment', 'value'])}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
                <ListItem className={classes.swapDetail__listitem}>
                  <ListItemText
                    primary={
                      <Typography variant="caption" gutterBottom>
                        ALICE SPEND
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Typography variant="caption" gutterBottom>
                      {swap.getIn(['alicespend', 'value'])}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider className={classes.swapDetail__divider} />
                <ListItem className={classes.swapDetail__listitem}>
                  <ListItemText
                    primary={
                      <Typography
                        variant="caption"
                        gutterBottom
                        className={classes.swapform__uppercase}
                      >
                        Status
                      </Typography>
                    }
                  />
                  <ListItemSecondaryAction>
                    <Typography
                      variant="caption"
                      gutterBottom
                      className={classes.swapform__uppercase}
                    >
                      {swap.get('status')}
                    </Typography>
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Grid>
            <BuyButton
              color="primary"
              variant="contained"
              className={classes.amountform__item}
              onClick={onClose}
            >
              Close
            </BuyButton>
          </Grid>
        </CardContent>
      </React.Fragment>
    );
  };

  render() {
    debug('render');
    const { swap, classes, detailModal, onClose } = this.props;
    return (
      <SwipeableDrawer
        anchor="right"
        open={detailModal.get('open')}
        onClose={onClose}
      >
        <div tabIndex={0} role="button" className={classes.swapDetail__content}>
          {!swap && this.renderNotFound()}
          {swap && this.renderSwap()}
        </div>
      </SwipeableDrawer>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    onClose: () => dispatch(closeDetailModal())
  };
}

const mapStateToProps = createStructuredSelector({
  detailModal: makeSelectSwapDetailModal(),
  swap: makeSelectSwapInDetailModal()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

const SwapDetailWapper = compose(
  withConnect,
  withStyles(styles)
)(SwapDetail);

export default SwapDetailWapper;
