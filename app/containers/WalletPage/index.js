// @flow
import React, { Component } from 'react';
import classNames from 'classnames';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import ErrorBoundary from '../../components/ErrorBoundary';
import MDCAppBar from '../../components/AppBar';
import MDCHeader from '../../components/AppBar/Header';
import PageSectionTitle from '../../components/PageSectionTitle';
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
    marginTop: 65,
    padding: '40px 24px 24px 24px'
  },

  containerSection: {
    paddingBottom: 25
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
        <Grid
          container
          spacing={0}
          className={classNames(classes.container, classes.container)}
        >
          {/* <Grid item xs={12} className={classes.containerSection}> */}
          <PageSectionTitle
            title={
              <FormattedMessage id="dicoapp.containers.Wallet.overview">
                {(...content) => content}
              </FormattedMessage>
            }
          />
          {/* </Grid> */}
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
      <MDCAppBar>
        <MDCHeader
          title={
            <FormattedMessage id="dicoapp.containers.Wallet.title">
              {(...content) => content}
            </FormattedMessage>
          }
        />
      </MDCAppBar>
      <WalletPageWapper />
    </ErrorBoundary>
  </NavigationLayout>
);

Index.propTypes = {};

Index.defaultProps = {};

export default Index;
