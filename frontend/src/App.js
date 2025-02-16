import React from 'react';
import theme from './theme';
import { ThemeProvider } from '@mui/material/styles';
import './assets/styles/global.css';

import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';

const App = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', margin: 0, padding: 0 }}>
      <ThemeProvider theme={theme}>
        <Header />
        <Main />
        <Footer />
      </ThemeProvider>
    </div>
  );
};


export default App;
