// @flow
import React from 'react';
import type { Node } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Divider from '@material-ui/core/Divider';
import MenuIcon from '@material-ui/icons/Menu';
import Tabs from './Tabs';

const styles = () => ({
  appBar: {
    boxShadow: 'none',
    backgroundColor: '#fff',
    left: 72
  },

  appBar__button: {
    marginLeft: -12,
    marginRight: 35
  }
});

type Props = {
  title: Node,
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

class MDCAppBar extends React.PureComponent<Props> {
  props: Props;

  static propTypes = {};

  render() {
    const { classes, title } = this.props;

    return (
      <AppBar position="fixed" color="default" className={classes.appBar}>
        <Toolbar>
          {/* <IconButton
            className={classes.appBar__button}
            color="inherit"
            aria-label="Menu"
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="title" color="inherit">
            {title}
          </Typography>
        </Toolbar>
        <Toolbar
          style={{
            minHeight: 48,
            paddingLeft: 12
          }}
        >
          <Tabs />
          <Divider />
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(MDCAppBar);
