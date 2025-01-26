import React from 'react';
import ReactDOM from 'react-dom/client'; // Використовується новий API для рендерингу
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import App from './App';

// Замість ReactDOM.render використовується createRoot
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <App />
  </ThemeProvider>
);
