// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
// import Card from '@material-ui/core/Card';
// import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import ErrorBoundary from '../../components/ErrorBoundary';
import MDCAppBar from '../../components/AppBar';
import { NavigationLayout } from '../Layout';

import Overview from './components/Overview';
import Transactions from './components/Transactions';
import reducer from './reducer';
import saga from './saga';
import { APP_STATE_NAME } from './constants';

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

// const styles = theme => ({
const styles = () => ({
  container: {
    padding: 24,
    marginTop: 65
  },

  containerSection: {
    paddingBottom: 25
  },

  cardContent: {
    position: 'relative',
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0
  }
});

const debug = require('debug')('dicoapp:containers:WalletPage');

class WalletPage extends Component<Props> {
  props: Props;

  render() {
    debug(`render`);

    const { classes } = this.props;

    return (
      <React.Fragment>
        <MDCAppBar title="Wallet" />

        <Grid
          container
          spacing={0}
          className={classNames(classes.container, classes.container)}
        >
          <Grid item xs={12} className={classes.containerSection}>
            <Typography variant="title" gutterBottom>
              Overview
            </Typography>
          </Grid>
          <Overview />
          <Transactions />
        </Grid>
      </React.Fragment>
    );
  }
}

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withSaga = injectSaga({ key: APP_STATE_NAME, saga });

const WalletPageWapper = compose(
  withReducer,
  withSaga,
  withStyles(styles)
)(WalletPage);

const Index = () => (
  <NavigationLayout background="#eeeeee">
    <ErrorBoundary>
      <WalletPageWapper />
    </ErrorBoundary>
  </NavigationLayout>
);

Index.propTypes = {};

Index.defaultProps = {};

export default Index;
