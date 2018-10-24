/* eslint-disable import/no-named-as-default */
// @flow
import React, { Component } from 'react';
// import classNames from 'classnames';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import ErrorBoundary from '../../components/ErrorBoundary';
import { TabContainer } from '../../components/Tabs';
import MDCAppBar from '../../components/AppBar';
import MDCHeader from '../../components/AppBar/Header';
import MDCTabBar from '../../components/AppBar/TabBar';
import PageSectionTitle from '../../components/PageSectionTitle';
import { NavigationLayout } from '../Layout';
import HeaderTabs from './components/HeaderTabs';
import Transactions from './components/Transactions';
import PortfolioTab from './PortfolioTab';
import ProgressBar from './ProgressBar';
import reducer from './reducer';
import saga from './saga';
import { APP_STATE_NAME } from './constants';

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

type State = {
  value: number
};

// const styles = theme => ({
const styles = () => ({
  container: {
    // marginTop: 65,
    marginTop: 112,
    padding: '40px 24px 24px 24px',
    flexGrow: 1
  },

  containerSection: {
    paddingBottom: 25
  }
});

const debug = require('debug')('dicoapp:containers:WalletPage');

class WalletPage extends Component<Props, State> {
  props: Props;

  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    debug(`render`);

    const { classes } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <ProgressBar />
        <NavigationLayout>
          <ErrorBoundary>
            <MDCAppBar>
              <MDCHeader
                title={
                  <FormattedMessage id="dicoapp.containers.Wallet.title">
                    {(...content) => content}
                  </FormattedMessage>
                }
              />
              <MDCTabBar>
                <HeaderTabs handleChange={this.handleChange} value={value} />
              </MDCTabBar>
            </MDCAppBar>
            <TabContainer selected={value === 0} className={classes.container}>
              <PageSectionTitle
                title={
                  <FormattedMessage id="dicoapp.containers.Wallet.overview">
                    {(...content) => content}
                  </FormattedMessage>
                }
              />
              <PortfolioTab />
            </TabContainer>
            <TabContainer selected={value === 1} className={classes.container}>
              <PageSectionTitle
                title={
                  <FormattedMessage id="dicoapp.containers.Wallet.last_transactions">
                    {(...content) => content}
                  </FormattedMessage>
                }
              />
              <Transactions />
            </TabContainer>
          </ErrorBoundary>
        </NavigationLayout>
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

export default WalletPageWapper;
/* eslint-enable import/no-named-as-default */
