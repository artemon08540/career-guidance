import React from 'react';
import theme from './theme';
import './App.css';
import { ThemeProvider } from '@mui/material/styles';
import './assets/styles/global.css';

import Header from './components/Header.tsx';
import Main from './components/Main';
import Footer from './components/Footer';

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Header />
        <Main />
        <Footer />
      </ThemeProvider>
    </div>
  );
};


export default App;
