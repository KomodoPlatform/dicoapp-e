// @flow
import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import injectReducer from '../../utils/inject-reducer';
import { APP_STATE_NAME } from './constants';
import reducer from './reducer';

const debug = require('debug')('dicoapp:containers:Snackbars');

type Props = {};

type State = {
  open: boolean
};

class Snackbars extends React.Component<Props, State> {
  state = {
    open: true
  };

  handleClick = () => {
    this.setState({ open: true });
  };

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    this.setState({ open: false });
  };

  render() {
    debug('render');
    const { open } = this.state;
    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={60000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">Note archived</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            onClick={this.handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    );
  }
}

const mapStateToProps = createStructuredSelector({});

const withReducer = injectReducer({ key: APP_STATE_NAME, reducer });
const withConnect = connect(
  mapStateToProps,
  null
);

export default compose(
  withReducer,
  withConnect
)(Snackbars);
