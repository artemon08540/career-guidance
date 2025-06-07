import React, { useState } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';
import './App.css';
import './assets/styles/global.css';

import Header from './components/Header.tsx';
import Main from './components/Main';
import Footer from './components/Footer';

const App: React.FC = () => {
  // Додаємо тут стан для тестового діалогу
  const [testOpen, setTestOpen] = useState(false);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        {/* Передаємо testOpen і setTestOpen у Header */}
        <Header testOpen={testOpen} setTestOpen={setTestOpen} />

        {/* Передаємо callback, щоб при кліку на слайд відкривати діалог */}
        <Main openTestDialog={() => setTestOpen(true)} />

        <Footer />
      </ThemeProvider>
    </div>
  );
};

export default App;
