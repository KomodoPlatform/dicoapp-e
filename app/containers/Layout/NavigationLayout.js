// @flow
import React, { PureComponent } from 'react';
import type { ChildrenArray } from 'react';
// import { remote } from 'electron';
// import { setWindowBounds } from 'electron-util';
import { withStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// import { minWindowSize } from '../../config/config-default';
import DICDrawer from '../Drawer';

const debug = require('debug')('dicoapp:containers:layout:NavigationLayout');

// const setAppWindowBounds = (size = minWindowSize) => {
//   const win = remote.getCurrentWindow();
//   win.setResizable(true);
//   win.setMaximizable(true);
//   win.setFullScreenable(true);
//   win.setMinimumSize(size.width, size.height);
//   setWindowBounds(size, { animated: true });
//   win.center();
// };

// const styles = theme => ({
const styles = () => ({
  content: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.default,
    backgroundColor: '#fff',
    // padding: theme.spacing.unit * 3,
    marginLeft: 72,
    // marginTop: 64,
    minHeight: '100%'
  },

  dicoDrawer: {
    color: 'rgba(0, 0, 0, .87)',
    position: 'fixed',
    top: 0,
    left: 0,
    '-webkit-box-sizing': 'border-box',
    boxSizing: 'border-box',
    width: 72,
    maxWidth: 72,
    height: '100%',
    overflow: 'hidden',
    contain: 'strict',
    backgroundColor: '#F6F6F6'
  }
});

type Props = {
  background?: string,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  children: ChildrenArray<any>
};

class NavigationLayout extends PureComponent<Props> {
  // constructor(props) {
  //   super(props);
  //   setAppWindowBounds();
  // }

  static defaultProps = {
    background: '#fff'
  };

  render() {
    debug(`render`);

    const { background, children, classes } = this.props;

    return (
      <React.Fragment>
        <aside
          className={classes.dicoDrawer}
          // style={{
          //   background
          // }}
        >
          <DICDrawer />
        </aside>
        <main
          className={classes.content}
          style={{
            background
          }}
        >
          {children}
        </main>
        {/* <div className={classes.root}> */}
        {/* <DICTypography> */}
        {/* <header className="mdc-toolbar mdc-toolbar--fixed fl-empty-layout__header"> */}

        {/* </header> */}
        {/* <aside className="mdc-drawer mdc-drawer--temporary mdc-drawer--open mdc-drawer--animating"> */}
        {/* </aside> */}

        {/* </DICTypography> */}
        {/* </div> */}
        {/* <div className="mdc-layout-grid">footer</div> */}
      </React.Fragment>
    );
  }
}

NavigationLayout.displayName = 'NavigationLayout';

export default withStyles(styles)(NavigationLayout);
