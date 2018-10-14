// @flow
import React from 'react';
import type { Map } from 'immutable';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import { getCoinIcon } from '../../../components/CryptoIcons';
import { STATE_SWAPS } from '../constants';
import CoinSelectable from './CoinSelectable';

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  onOpen: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  onClose: Function,
  open: boolean,
  swap: Map<*, *>
};

const styles = () => ({
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
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontSize: 25,
    width: 100
  },

  swapform_button: {
    margin: '0 auto'
  }
});

export class SwapDetail extends React.PureComponent<Props> {
  renderNotFound = () => <h1>Not Found</h1>;

  renderSwap = () => {
    const { swap, classes } = this.props;
    return (
      <Grid container spacing={24}>
        <Grid item xs={6} className={classes.amountform__itemCenter}>
          <CoinSelectable
            className={classes.swapform_button}
            icon={getCoinIcon(swap.get('alice'))}
            title="Deposit"
            subTitle={
              <span>
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
              <span>
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
          <Typography variant="caption" gutterBottom>
            UUID: {swap.get('uuid')}
          </Typography>
        </Grid>
      </Grid>
    );
  };

  render() {
    const { swap, classes, open, onOpen, onClose } = this.props;
    return (
      <SwipeableDrawer
        anchor="right"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        <CardContent
          tabIndex={0}
          role="button"
          className={classes.swapDetail__content}
        >
          {!swap && this.renderNotFound()}
          {swap && this.renderSwap()}
        </CardContent>
      </SwipeableDrawer>
    );
  }
}

export default withStyles(styles)(SwapDetail);
