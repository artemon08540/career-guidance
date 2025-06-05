// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0D1B2A',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ffcc00',
    },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
});

export default theme;
