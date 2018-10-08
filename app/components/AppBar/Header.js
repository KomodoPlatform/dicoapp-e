// @flow
import React from 'react';
import type { Node } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

type Props = {
  title: Node
};

const Header = ({ title }: Props) => (
  <Toolbar>
    <Typography variant="title" color="inherit">
      {title}
    </Typography>
  </Toolbar>
);

export default Header;
