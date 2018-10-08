// @flow
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import TabContainer from './TabContainer';

const styles = theme => ({
  buyTabs__tab: {
    minWidth: 100
  },

  buyTabs__labelContainer: {
    paddingLeft: 12,
    paddingRight: 12
  },

  buyTabs__badge: {
    top: -15,
    right: -15,
    // The border color match the background color.
    border: `2px solid ${
      theme.palette.type === 'light'
        ? theme.palette.grey[200]
        : theme.palette.grey[900]
    }`
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

type State = {
  value: number
};

class HeaderTabs extends React.Component<Props, State> {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <React.Fragment>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={this.handleChange}
        >
          <Tab
            classes={{
              labelContainer: classes.buyTabs__labelContainer
            }}
            label={<span>Place Order</span>}
            className={classes.buyTabs__tab}
          />
          <Tab
            label={
              <Badge
                className={classes.padding}
                color="secondary"
                badgeContent={4}
                classes={{ badge: classes.buyTabs__badge }}
              >
                My Orders
              </Badge>
            }
            className={classes.buyTabs__tab}
          />
        </Tabs>
        <TabContainer selected={value === 0}>Item One</TabContainer>
        <TabContainer selected={value === 1}>Item Two</TabContainer>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(HeaderTabs);
