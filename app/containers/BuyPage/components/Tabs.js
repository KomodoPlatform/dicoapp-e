// @flow
import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class DisabledTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;
    return (
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={this.handleChange}
      >
        <Tab label="Place Order" />
        <Tab label="My Orders" />
      </Tabs>
    );
  }
}

export default DisabledTabs;
