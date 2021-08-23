
import { createTheme } from '@material-ui/core/styles';
import { amber, deepOrange, red } from '@material-ui/core/colors';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: amber[900],
    },
    secondary: {
      main: deepOrange[900],
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});

export default theme;