import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

import getInjectors from './websocket-injectors';

const debug = require('debug')('dicoapp:utils:inject-websocket');

type Context = {
  // eslint-disable-next-line flowtype/no-weak-types
  store: Object
};

export default ({ key, subscribe, mode }) => WrappedComponent => {
  class InjectWebsocket extends React.Component<{}, {}, Context> {
    static WrappedComponent = WrappedComponent;

    static displayName = `withWebsocket(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    componentWillMount() {
      const { injectWebsocket } = this.injectors;

      debug(`injectWebsocket ${key}`);
      injectWebsocket(key, { subscribe, mode }, this.props);
    }

    componentWillUnmount() {
      const { ejectWebsocket } = this.injectors;

      debug(`ejectWebsocket ${key}`);
      ejectWebsocket(key);
    }

    // eslint-disable-next-line react/destructuring-assignment
    injectors = getInjectors(this.context.store);

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(InjectWebsocket, WrappedComponent);
};
