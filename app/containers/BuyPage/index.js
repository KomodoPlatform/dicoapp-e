// @flow
import React, { Component } from 'react';
import { compose } from 'redux';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import injectReducer from '../../utils/inject-reducer';
import injectSaga from '../../utils/inject-saga';
import injectWebsocket from '../../utils/inject-websocket';
import { WEBSOCKET_DAEMON } from '../../utils/constants';
import MDCAppBar from '../../components/AppBar';
import MDCHeader from '../../components/AppBar/Header';
import MDCTabBar from '../../components/AppBar/TabBar';
import ErrorBoundary from '../../components/ErrorBoundary';
import { NavigationLayout } from '../Layout';
import HeaderTabs from './components/HeaderTabs';
// import TestSwap from './components/TestSwap';
import { APP_STATE_NAME } from './constants';
import reducer from './reducer';
import saga from './saga';
import subscribe from './subscribe';

const debug = require('debug')('dicoapp:containers:BuyPage');

const styles = () => ({});

type Props = {};

type State = {};

class BuyPage extends Component<Props, State> {
  props: Props;

  render() {
    debug('render');

    return (
      <NavigationLayout>
        <ErrorBoundary>
          <MDCAppBar>
            <MDCHeader
              title={
                <FormattedMessage id="dicoapp.containers.BuyPage.title">
                  {(...content) => content}
                </FormattedMessage>
              }
            />
            <MDCTabBar>
              <HeaderTabs />
            </MDCTabBar>
          </MDCAppBar>
          {/* <BuyPageWapper /> */}
        </ErrorBoundary>
      </NavigationLayout>
    );
  }
}

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withSaga = injectSaga({ key: APP_STATE_NAME, saga });
const withWebsocket = injectWebsocket({
  key: APP_STATE_NAME,
  mode: WEBSOCKET_DAEMON,
  subscribe
});

const BuyPageWapper = compose(
  withReducer,
  withSaga,
  withWebsocket,
  withStyles(styles)
)(BuyPage);

export default BuyPageWapper;
