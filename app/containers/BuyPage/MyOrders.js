// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
// import { FormattedMessage } from 'react-intl';
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import PageSectionTitle from '../../components/PageSectionTitle';
import {
  makeSelectBalanceEntities,
  makeSelectBalanceLoading
} from '../App/selectors';

const debug = require('debug')('dicoapp:containers:BuyPage:MyOrders');

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
  },

  myOrder__listItem: {
    paddingLeft: 0
  }
});

type Props = {
  // eslint-disable-next-line flowtype/no-weak-types
  classes: Object
};

class MyOrders extends React.PureComponent<Props> {
  props: Props;

  render() {
    debug('render');

    const { classes } = this.props;

    return (
      <Grid container spacing={0} className={classes.container}>
        <Grid item xs={12} className={classes.containerSection}>
          <CardContent className={classes.cardContent}>
            <PageSectionTitle title="Swap in progress" />

            <List dense={false}>
              <ListItem button className={classes.myOrder__listItem}>
                <ListItemText
                  primary="c44eddd651e21616cabc9220afa74717706b92472b639aaf9479b81dd3bf8f3e"
                  secondary="Step 3/6 (Bob Deposit)"
                />
              </ListItem>
            </List>
          </CardContent>

          <CardContent className={classes.cardContent}>
            <PageSectionTitle title="History" />

            <List dense={false}>
              <ListItem button className={classes.myOrder__listItem}>
                <ListItemText
                  primary="c44eddd651e21616cabc9220afa74717706b92472b639aaf9479b81dd3bf8f3e"
                  secondary="Step 6/6 (Swap Finished)"
                />
              </ListItem>
            </List>
          </CardContent>
        </Grid>
      </Grid>
    );
  }
}

// eslint-disable-next-line flowtype/no-weak-types
// export function mapDispatchToProps(dispatch: Dispatch<Object>) {
//   return {};
// }

const mapStateToProps = createStructuredSelector({
  balance: makeSelectBalanceEntities(),
  balanceLoading: makeSelectBalanceLoading()
});

const withConnect = connect(
  mapStateToProps,
  null
);

const MyOrdersWapper = compose(
  withConnect,
  withStyles(styles)
)(MyOrders);

export default MyOrdersWapper;
