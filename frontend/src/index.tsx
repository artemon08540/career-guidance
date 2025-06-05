// src/index.js

import React from 'react'; 
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import theme from './theme';
import App from './App.tsx';                    // ваша головна сторінка (Main → App)
import UniversityPage from './pages/UniversityPage'; 
import './index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container missing in index.html');
}
const root = ReactDOM.createRoot(container);

root.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
      <Routes>
        {/* маршрут "/" рендерить ваш App (де Header, Main, Footer) */}
        <Route path="/" element={<App />} />
        {/* маршрут "/university" рендерить сторінку з Header, University і Footer */}
        <Route path="/university" element={<UniversityPage />} />
        {/* Тут можна додати інші маршрути за потреби */}
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);
