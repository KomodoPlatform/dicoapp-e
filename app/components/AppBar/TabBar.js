// @flow
import React from 'react';
import type { Element } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

const styles = () => ({
  root: {
    minHeight: 48,
    paddingLeft: 12
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object,
  // eslint-disable-next-line flowtype/no-weak-types
  children: Element<any>
};

const TabBar = ({ classes, children }: Props) => (
  <Toolbar className={classes.root}>{children}</Toolbar>
);

export default withStyles(styles)(TabBar);
