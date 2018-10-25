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
import Asset from './components/Asset';
import { openWithdrawModal } from './actions';

const debug = require('debug')('dicoapp:containers:WalletPage:PortfolioTab');

const styles = theme => ({
  containerSection: {
    paddingBottom: theme.spacing.unit * 4
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
  dispatchLoadWithdraw: Function,
  // eslint-disable-next-line flowtype/no-weak-types
  openWithdraw: Function
};

class PortfolioTab extends React.PureComponent<Props> {
  componentDidMount = () => {
    debug('watch transactions');
    const { dispatchLoadBalance } = this.props;
    dispatchLoadBalance();
  };

  renderWallet = (t, k) => {
    const {
      classes,
      entities,
      dispatchLoadWithdraw,
      openWithdraw
    } = this.props;
    const data = entities.get(t);
    return (
      <Grid
        key={`wallet_page_overview${data.get('coin')}`}
        item
        xs={6}
        className={ClassNames(classes.containerSection, {
          [classes.portfolioTab__tabLeft]: k % 2 === 1,
          [classes.portfolioTab__tabRight]: k % 2 === 0
        })}
      >
        <Asset
          data={data}
          dispatchLoadWithdraw={dispatchLoadWithdraw}
          openWithdraw={openWithdraw}
        />
      </Grid>
    );
  };

  render() {
    debug(`render`);

    const { list } = this.props;

    return (
      <Grid container spacing={16}>
        {list.map(this.renderWallet)}
      </Grid>
    );
  }
}

PortfolioTab.displayName = 'Overview';

// eslint-disable-next-line flowtype/no-weak-types
export function mapDispatchToProps(dispatch: Dispatch<Object>) {
  return {
    openWithdraw: () => dispatch(openWithdrawModal()),
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
)(PortfolioTab);
/* eslint-enable react/no-array-index-key */
