// @flow

import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
// import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import PageSectionTitle from '../../components/PageSectionTitle';

const debug = require('debug')('dicoapp:containers:MyOrders');

const styles = () => ({
  container: {
    // marginTop: 65,
    marginTop: 112,
    padding: '40px 24px 24px 24px'
  },

  containerSection: {
    paddingBottom: 30
  },

  hr: {
    marginBottom: 20
  },

  cardContent: {
    position: 'relative',
    paddingTop: 0,
    paddingLeft: 0,
    paddingRight: 0
  },

  cardContent__rightBtn: {
    position: 'absolute',
    right: 0,
    top: -12
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

type State = {};

class MyOrders extends Component<Props, State> {
  props: Props;

  state = {};

  render() {
    debug('render');

    const { classes } = this.props;

    return (
      <Grid container spacing={0} className={classes.container}>
        <Grid item xs={12} className={classes.containerSection}>
          <CardContent className={classes.cardContent}>
            <PageSectionTitle title="Swap in progress" />
          </CardContent>

          <CardContent className={classes.cardContent}>
            <PageSectionTitle title="History" />
          </CardContent>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(MyOrders);
