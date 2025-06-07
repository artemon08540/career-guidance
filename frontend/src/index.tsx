// src/index.js

import React from 'react'; 
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import theme from './theme';
import App from './App.tsx';                    // ваша головна сторінка (Main → App)
import UniversityPage from './pages/UniversityPage'; 
import SpecialtiesPage from './pages/SpecialtiesPage';  
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
        {/* головна сторінка: Header, Main, Footer */}
        <Route path="/" element={<App />} />

        {/* університетська сторінка: Header, University, Footer */}
        <Route path="/university" element={<UniversityPage />} />

        {/* сторінка «Спеціальності»: Header, Specialties, Footer */}
        <Route path="/specialties" element={<SpecialtiesPage />} />

        {/* за потреби можна додати ще маршрути, напр. для тестування */}
        {/* <Route path="/test" element={<TestPage />} /> */}

        {/* необов’язково: перенаправити всі інші невідомі шляхи на головну */}
        {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);