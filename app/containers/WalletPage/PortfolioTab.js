/* eslint-disable react/no-array-index-key */
// @flow
import React from 'react';
import ClassNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import Grid from '@material-ui/core/Grid';
import {
  makeSelectBalanceList,
  makeSelectBalanceEntities
} from '../App/selectors';
import { loadBalance, loadWithdraw } from '../App/actions';
import Wallet from './components/Wallet';

const debug = require('debug')('dicoapp:containers:WalletPage:Overview');

const styles = theme => ({
  containerSection: {
    paddingBottom: 30
    // paddingRight: 30
  },

  portfolioTab__tabLeft: {
    paddingLeft: theme.spacing.unit * 2
  },

  portfolioTab__tabRight: {
    paddingRight: theme.spacing.unit * 2
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  list: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  entities: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadBalance: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  dispatchLoadWithdraw: Function
};

class Overview extends React.PureComponent<Props> {
  componentDidMount = () => {
    debug('watch transactions');
    const { dispatchLoadBalance } = this.props;
    dispatchLoadBalance();
  };

  renderWallet = (t, k) => {
    const { classes, entities, dispatchLoadWithdraw } = this.props;
    const data = entities.get(t);
    return (
      <Grid
        key={`wallet_page_overview${k}`}
        item
        xs={6}
        className={ClassNames(classes.containerSection, {
          [classes.portfolioTab__tabLeft]: k % 2 === 1,
          [classes.portfolioTab__tabRight]: k % 2 === 0
        })}
      >
        <Wallet
          key={data.get('coin')}
          data={data}
          dispatchLoadWithdraw={dispatchLoadWithdraw}
        />
      </Grid>
    );
  };

  render() {
    debug(`render`);

    const { list } = this.props;

    return (
      <Grid container spacing={12}>
        {list.map(this.renderWallet)}
      </Grid>
    );
  }
}

Overview.displayName = 'Overview';

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    dispatchLoadBalance: () => dispatch(loadBalance()),
    dispatchLoadWithdraw: (payload: {
      amount: number,
      address: string,
      coin: string
    }) => dispatch(loadWithdraw(payload))
  };
}

const mapStateToProps = createStructuredSelector({
  list: makeSelectBalanceList(),
  entities: makeSelectBalanceEntities()
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  withConnect,
  withStyles(styles)
)(Overview);
/* eslint-enable react/no-array-index-key */
