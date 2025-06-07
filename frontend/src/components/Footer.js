// src/components/Footer.jsx

import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        {/* Ліва частина – Логотип */}
        <div className="footer-logo-container">
          <a
            href="https://ust.edu.ua/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/images/logo2.png"
              alt="University Logo"
              className="footer-logo"
            />
          </a>
        </div>

        {/* Центральна частина – Інформація про університет */}
        <div className="footer-info-container">
          <div className="footer-university-name">
            <a
              href="https://ust.edu.ua/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-university-link"
            >
              Український державний університет науки і технологій
            </a>
          </div>
          <div className="footer-info-text">
            49010, Україна, м. Дніпро, вул. Лазаряна, 2
          </div>
          <div className="footer-info-text">
            Email:{' '}
            <a href="mailto:office@ust.edu.ua" className="footer-info-link">
              office@ust.edu.ua
            </a>
          </div>
          <div className="footer-info-text">
            Приймальня ректора:{' '}
            <a href="tel:+380567931900" className="footer-info-link">
              +38 (056) 793-19-00
            </a>
            ;{' '}
            <a href="tel:+380563731544" className="footer-info-link">
              +38 (056) 373-15-44
            </a>
          </div>
          <div className="footer-info-text">
            Загальний відділ:{' '}
            <a href="tel:+380563731505" className="footer-info-link">
              +38 (056) 373-15-05
            </a>
          </div>
        </div>

        {/* Права частина – Соцмережі */}
        <div className="footer-social-container">
          <div className="footer-social-links">
            <a
              href="https://www.facebook.com/university.ust"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
            >
              <img src="/images/facebook-icon.png" alt="Facebook" />
            </a>
            <a
              href="https://t.me/official_ust"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
            >
              <img src="/images/telegram-icon.png" alt="Telegram" />
            </a>
            <a
              href="https://www.youtube.com/@ust.official"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
            >
              <img src="/images/youtube-icon.png" alt="YouTube" />
            </a>
            <a
              href="https://www.instagram.com/ust.university/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-social-icon"
            >
              <img src="/images/instagram-icon.png" alt="Instagram" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
