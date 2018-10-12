// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { List } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
// import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import MDCList from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import LinearProgress from '@material-ui/core/LinearProgress';
import PageSectionTitle from '../../components/PageSectionTitle';
import { getCoinIcon } from '../../components/CryptoIcons';
import {
  makeSelectBalanceEntities,
  makeSelectBalanceLoading
} from '../App/selectors';
import { makeSelectCurrentSwaps, makeSelectFinishedSwaps } from './selectors';

const debug = require('debug')('dicoapp:containers:BuyPage:MyOrders');

const styles = () => ({
  container: {
    // marginTop: 65,
    marginTop: 112,
    padding: '40px 24px 24px 24px'
  },

  containerSection: {
    paddingBottom: 30
  },

  hr: {
    marginBottom: 20
  },

  cardContent: {
    position: 'relative',
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0
  },

  cardContent__rightBtn: {
    position: 'absolute',
    right: 0,
    top: -12
  },

  myOrder__listItem: {
    paddingLeft: 0
  },

  myOrder__ItemDay: {
    flex: 'none'
  },

  myOrder__ItemText: {
    // flex: '5 1 auto'
  },

  myOrder__ItemTextRight: {
    textAlign: 'right',
    top: '50%',
    right: 4,
    position: 'absolute',
    transform: 'translateY(-50%)'
  },

  myOrder__linearProgress: {
    height: 2
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  currentSwaps: List<*>,
  finishedSwaps: List<*>
};

class MyOrders extends React.PureComponent<Props> {
  props: Props;

  renderSwap = swap => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <ListItem
          key={swap.get('uuid')}
          button
          className={classes.myOrder__listItem}
        >
          <ListItemText
            primary="OCT"
            secondary="15"
            className={classes.myOrder__ItemDay}
          />
          {/* {getCoinIcon(swap.get('alice'))} */}
          {getCoinIcon(swap.get('bob'))}
          <ListItemText
            primary={swap.get('uuid')}
            secondary={`Step ${swap.get('sentflags').size + 1}/6`}
            className={classes.myOrder__ItemText}
          />
          <ListItemText
            primary={`+ ${swap.get('bobamount')} ${swap.get('bob')}`}
            secondary={`- ${swap.get('aliceamount')} ${swap.get('alice')}`}
            className={classes.myOrder__ItemTextRight}
          />
        </ListItem>
        <LinearProgress
          variant="determinate"
          value={swap.get('sentflags').size * 20}
          className={classes.myOrder__linearProgress}
        />
      </React.Fragment>
    );
  };

  renderCurrentSwaps = () => {
    const { currentSwaps } = this.props;
    return currentSwaps.map(this.renderSwap);
  };

  renderfinishedSwaps = () => {
    const { finishedSwaps } = this.props;
    return finishedSwaps.map(this.renderSwap);
  };

  render() {
    debug('render');

    const { classes } = this.props;

    return (
      <Grid container spacing={0} className={classes.container}>
        <Grid item xs={12} className={classes.containerSection}>
          <CardContent className={classes.cardContent}>
            <PageSectionTitle title="Swap in progress" />

            <MDCList dense={false}>{this.renderCurrentSwaps()}</MDCList>
          </CardContent>

          <CardContent className={classes.cardContent}>
            <PageSectionTitle title="History" />

            <MDCList dense={false}>{this.renderfinishedSwaps()}</MDCList>
          </CardContent>
        </Grid>
      </Grid>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
// export function mapDispatchToProps(dispatch: Dispatch<Object>) {
//   return {};
// }

const mapStateToProps = createStructuredSelector({
  balance: makeSelectBalanceEntities(),
  balanceLoading: makeSelectBalanceLoading(),
  currentSwaps: makeSelectCurrentSwaps(),
  finishedSwaps: makeSelectFinishedSwaps()
});

const withConnect = connect(
  mapStateToProps,
  null
);

const MyOrdersWapper = compose(
  withConnect,
  withStyles(styles)
)(MyOrders);

export default MyOrdersWapper;
