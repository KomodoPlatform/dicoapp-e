// https://material-ui.com/customization/themes/#themes

import { createMuiTheme } from '@material-ui/core/styles';
// import blue from '@material-ui/core/colors/blue';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      // This is a main color for button
      main: '#3f51b5'
    }
  }
});

export default theme;
