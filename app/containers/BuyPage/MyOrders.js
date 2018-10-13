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
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import PageSectionTitle from '../../components/PageSectionTitle';
import {
  makeSelectBalanceEntities,
  makeSelectBalanceLoading
} from '../App/selectors';
import TransactionRecord from './components/TransactionRecord';
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
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  currentSwaps: List<*>,
  finishedSwaps: List<*>
};

type State = {
  right: boolean
};

class MyOrders extends React.PureComponent<Props, State> {
  props: Props;

  state = {
    right: false
  };

  openRight = () => {
    this.setState({
      right: true
    });
  };

  closeRight = () => {
    this.setState({
      right: false
    });
  };

  renderSwap = swap => {
    console.log(swap.get('uuid'), 'uuid');
    return (
      <TransactionRecord
        key={swap.get('uuid')}
        onClick={this.openRight}
        swap={swap}
      />
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
    const { right } = this.state;
    return (
      <React.Fragment>
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
        <SwipeableDrawer
          anchor="right"
          open={right}
          onClose={this.closeRight}
          onOpen={this.openRight}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.closeRight}
            onKeyDown={this.closeRight}
          >
            transaction time
          </div>
        </SwipeableDrawer>
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
