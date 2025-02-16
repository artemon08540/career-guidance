import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#0077cc' },
    secondary: { main: '#ffcc00' },
  },
  typography: {
    fontFamily: '"Inter", sans-serif',
  },
});

export default theme;
