// @flow
import React from 'react';
// import ClassNames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { List } from 'immutable';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
// import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import MDCList from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import CloudOff from '@material-ui/icons/CloudOff';

import {
  makeSelectBalanceEntities,
  makeSelectBalanceLoading
} from '../App/selectors';
import {
  makeSelectCurrentSwaps,
  makeSelectFinishedSwaps,
  makeSelectSwapsEntities
} from './selectors';
import PageSectionTitle from '../../components/PageSectionTitle';
import SwapDetailModal from './components/SwapDetailModal';
import TransactionRecord from './components/TransactionRecord';

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

  swapform__emptystate: {
    textAlign: 'center'
  },

  swapform__iconemptystate: {
    fontSize: 50
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  currentSwaps: List<*>,
  finishedSwaps: List<*>,
  swapsEntities: Map<*, *>
};

type State = {
  right: boolean,
  uuid?: string | null
};

class MyOrders extends React.PureComponent<Props, State> {
  props: Props;

  state = {
    right: false,
    uuid: null
  };

  openRight = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    const { target } = evt;
    const { uuid } = this.state;
    const u = {
      right: true
    };
    if (target.value && target.value !== uuid) {
      u.uuid = target.value;
    }
    this.setState(u);
  };

  closeRight = (evt: SyntheticInputEvent<>) => {
    evt.preventDefault();
    this.setState({
      right: false
    });
  };

  renderSwap = swap => (
    <TransactionRecord
      key={swap.get('uuid')}
      onClick={this.openRight}
      swap={swap}
    />
  );

  renderEmptyState = () => {
    const { classes } = this.props;
    return (
      <React.Fragment>
        <Typography
          variant="title"
          gutterBottom
          className={classes.swapform__emptystate}
        >
          <CloudOff className={classes.swapform__iconemptystate} />
        </Typography>
        <Typography
          variant="subheading"
          gutterBottom
          className={classes.swapform__emptystate}
        >
          No data found. Please start making a swap.
        </Typography>
      </React.Fragment>
    );
  };

  renderCurrentSwaps = () => {
    const { currentSwaps } = this.props;
    const hasData = currentSwaps.size > 0;
    if (!hasData) return this.renderEmptyState();
    return <MDCList>{currentSwaps.map(this.renderSwap)}</MDCList>;
  };

  renderfinishedSwaps = () => {
    const { finishedSwaps } = this.props;
    const hasData = finishedSwaps.size > 0;
    if (!hasData) return this.renderEmptyState();
    return <MDCList>{finishedSwaps.map(this.renderSwap)}</MDCList>;
  };

  render() {
    debug('render');

    const { classes, swapsEntities } = this.props;
    const { right, uuid } = this.state;
    return (
      <React.Fragment>
        <Grid container spacing={0} className={classes.container}>
          <Grid item xs={12} className={classes.containerSection}>
            <CardContent className={classes.cardContent}>
              <PageSectionTitle title="Swap in progress" />

              {this.renderCurrentSwaps()}
            </CardContent>

            <CardContent className={classes.cardContent}>
              <PageSectionTitle title="History" />

              {this.renderfinishedSwaps()}
            </CardContent>
          </Grid>
        </Grid>
        <SwapDetailModal
          open={right}
          onClose={this.closeRight}
          onOpen={this.openRight}
          swap={swapsEntities.get(uuid)}
        />
      </React.Fragment>
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
  finishedSwaps: makeSelectFinishedSwaps(),
  swapsEntities: makeSelectSwapsEntities()
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
