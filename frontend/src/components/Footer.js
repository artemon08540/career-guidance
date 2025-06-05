import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Ліва частина – Логотип */}
        <div className="footer-logo-container">
          <img
            src="/images/logo2.png"
            alt="University Logo"
            className="footer-logo"
          />
        </div>

        {/* Центральна частина – Інформація про університет */}
        <div className="footer-info-container">
          <div className="footer-university-name">
            Український державний університет науки і технологій
          </div>
          <div className="footer-info-text">
            49010, Україна, м. Дніпро, вул. Лазаряна, 2
          </div>
          <div className="footer-info-text">
            Email: office@ust.edu.ua
          </div>
          <div className="footer-info-text">
            Приймальня ректора: +38 (056) 793-19-00
          </div>
          <div className="footer-info-text">
            Загальний відділ: +38 (056) 373-15-05
          </div>
        </div>

        {/* Права частина – Соцмережі */}
        <div className="footer-social-container">
          <div className="footer-social-links">
            <a href="#" className="footer-social-icon">
              <img src="/images/facebook-icon.png" alt="Facebook" />
            </a>
            <a href="#" className="footer-social-icon">
              <img src="/images/telegram-icon.png" alt="Telegram" />
            </a>
            <a href="#" className="footer-social-icon">
              <img src="/images/youtube-icon.png" alt="YouTube" />
            </a>
            <a href="#" className="footer-social-icon">
              <img src="/images/instagram-icon.png" alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
