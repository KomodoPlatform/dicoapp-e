import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import getInjectors from './reducer-injectors';

const debug = require('debug')('dicoapp:utils:inject-reducer');

type Context = {
  // eslint-disable-next-line flowtype/no-weak-types
  store: Object
};

/**
 * Dynamically injects a reducer
 *
 * @param {string} key A key of the reducer
 * @param {function} reducer A reducer that will be injected
 *
 */
export default ({ key, reducer }) => WrappedComponent => {
  class ReducerInjector extends React.Component<{}, {}, Context> {
    static WrappedComponent = WrappedComponent;

    static displayName = `withReducer(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    componentWillMount() {
      const { injectReducer } = this.injectors;
      debug(`injectReducer ${key}`);
      injectReducer(key, reducer);
    }

    // eslint-disable-next-line react/destructuring-assignment
    injectors = getInjectors(this.context.store);

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return hoistNonReactStatics(ReducerInjector, WrappedComponent);
};
