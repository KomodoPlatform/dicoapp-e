/* eslint-disable react/no-array-index-key */
// @flow
import React, { PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import type { Dispatch } from 'redux';
import { createStructuredSelector } from 'reselect';
import Grid from '@material-ui/core/Grid';
import {
  makeSelectBalanceList,
  makeSelectBalanceEntities
} from '../../App/selectors';
import { loadBalance, loadWithdraw } from '../../App/actions';
import Wallet from './Wallet';

const debug = require('debug')('dicoapp:containers:WalletPage:Overview');

const styles = () => ({
  containerSection: {
    paddingBottom: 30
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

class Overview extends PureComponent<Props> {
  componentDidMount = () => {
    debug('watch transactions');
    const { dispatchLoadBalance } = this.props;
    dispatchLoadBalance();
  };

  render() {
    debug(`render`);

    const { classes, list, entities, dispatchLoadWithdraw } = this.props;

    return (
      <React.Fragment>
        {list.map((t, k) => (
          <Grid key={k} item xs={12} className={classes.containerSection}>
            <Wallet
              data={entities.get(t)}
              dispatchLoadWithdraw={dispatchLoadWithdraw}
            />
          </Grid>
        ))}
      </React.Fragment>
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
