// @flow
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withStyles } from '@material-ui/core/styles';

const styles = () => ({
  buyTabs__tab: {
    minWidth: 100
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

type State = {
  value: number
};

class BuyTabs extends React.Component<Props, State> {
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
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={this.handleChange}
      >
        <Tab label="Place Order" className={classes.buyTabs__tab} />
        <Tab label="My Orders" className={classes.buyTabs__tab} />
      </Tabs>
    );
  }
}

export default withStyles(styles)(BuyTabs);
