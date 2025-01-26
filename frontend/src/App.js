import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home'; // Головна сторінка
/*import Specialities from './pages/Specialities'; // Сторінка "Спеціальності"*/
import Test from './pages/Test'; // Сторінка "Тест"

const App = () => (
  <Router>
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Шапка сайту */}
      <Header />

      {/* Основний вміст сторінки */}
      <main style={{ flex: 1, padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Головна сторінка */}
        </Routes>
      </main>

      {/* Підвал сайту */}
      <Footer />
    </div>
  </Router>
);

export default App;
