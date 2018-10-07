/* eslint-disable import/no-named-as-default */
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { AppContainer } from 'react-hot-loader';
import { createHashHistory } from 'history';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from './components/Theme';
import configureStore from './store/configureStore';
import LanguageProvider from './containers/LanguageProvider';
import Routes from './containers/Routes';
import { translationMessages } from './i18n';
import './app.global.css';

// Create redux store with history

const initialState = {};
const history = createHashHistory();
const store = configureStore(initialState, history);
const MOUNT_NODE = document.getElementById('root');

const render = (AppComponent, messages) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <LanguageProvider messages={messages}>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            <ConnectedRouter history={history}>
              <AppComponent />
            </ConnectedRouter>
          </MuiThemeProvider>
        </LanguageProvider>
      </Provider>
    </AppContainer>,
    MOUNT_NODE
  );
};

if (module.hot) {
  module.hot.accept(['./i18n', './containers/Routes'], () => {
    // ReactDOM.unmountComponentAtNode(MOUNT_NODE);
    // render();
    const NextRoot = require('./containers/Routes'); // eslint-disable-line global-require
    render(NextRoot, translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  new Promise(resolve => {
    resolve(import('intl'));
  })
    .then(() =>
      Promise.all([
        import('intl/locale-data/jsonp/en.js'),
        import('intl/locale-data/jsonp/vi.js')
      ])
    )
    .then(() => render(Routes, translationMessages))
    .catch(err => {
      throw err;
    });
} else {
  render(Routes, translationMessages);
}

// import { spawn } from './lib/threads';
// const thread = spawn(function([a, b]) {
//   // Remember that this function will be run in another execution context.
//   return new Promise(resolve => {
//     setTimeout(() => resolve(a + b), 1000);
//   });
// });

// thread
//   .send([9, 12])
//   // The handlers come here: (none of them is mandatory)
//   .on('message', function(response) {
//     console.log('9 + 12 = ', response);
//     thread.kill();
//   })
//   .on('error', function(error) {
//     console.error('Worker errored:', error);
//   })
//   .on('exit', function() {
//     console.log('Worker has been terminated.');
//   });

/* eslint-enable import/no-named-as-default */
