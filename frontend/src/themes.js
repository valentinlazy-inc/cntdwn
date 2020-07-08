import { createMuiTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';

export const whiteTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#ccc',
      main: '#000',
      dark: '#000',
      contrastText: '#fff'
    },
    secondary: grey,
    background: {
      default: '#fff'
    }
  }
});

export const blackTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      light: '#fff',
      main: '#fff',
      dark: '#fff',
      contrastText: '#000'
    },
    secondary: grey,
    background: {
      paper: '#000',
      default: '#000'
    },
    text: {
      primary: 'rgba(255, 255, 255, 1)',
      secondary: 'rgba(255, 255, 255, 0.9)',
      disabled: 'rgba(255, 255, 255, 0.8)',
      hint: 'rgba(255, 255, 255, 0.85)'
    },
    action: {
      active: 'rgba(255, 255, 255, 0.5)',
      hover: 'rgba(255, 255, 255, 0.68)',
      hoverOpacity: 0.38,
      selected: 'rgba(255, 255, 255, 0.94)',
      disabled: 'rgba(255, 255, 255, 0.76)',
      disabledBackground: 'rgba(255, 255, 255, 0.62)'
    }
  }
});
