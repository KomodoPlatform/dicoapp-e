// @flow
import React from 'react';
import type { Element } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Divider from '@material-ui/core/Divider';

const styles = () => ({
  appBar: {
    boxShadow: 'none',
    backgroundColor: '#fff',
    left: 72
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  children: Element<any>
};

class MDCAppBar extends React.PureComponent<Props> {
  props: Props;

  static propTypes = {};

  render() {
    const { classes, children } = this.props;

    return (
      <AppBar position="fixed" color="default" className={classes.appBar}>
        {children}
        <Divider />
      </AppBar>
    );
  }
}

export default withStyles(styles)(MDCAppBar);
