// src/components/Main.jsx

import React from 'react';
import Slider from 'react-slick';

// MUI
import { Grid, Box, Typography, useTheme, useMediaQuery } from '@mui/material';

// Slick‐Carousel CSS (базові стилі слайдера)
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Наш власний CSS
import './Main.css';

// Масив зображень для слайдера
const images = [
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
];

// Кастомна стрілка “Далі”
const NextArrow = ({ onClick }) => (
  <Box className="main-slider__arrow main-slider__arrow--next" onClick={onClick}>
    ›
  </Box>
);

// Кастомна стрілка “Назад”
const PrevArrow = ({ onClick }) => (
  <Box className="main-slider__arrow main-slider__arrow--prev" onClick={onClick}>
    ‹
  </Box>
);

export default function Main() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // <600px
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md')); // 600px–959px

  // Налаштування слайдера
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: !isMobile,          // Авто‐програвання відключене на мобільних
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box component="main" className="main-root">
      <Grid
        container
        className="main-grid"
        direction={isMobile || isTablet ? 'column' : 'row'}
      >
        {/* ============================
            Слайдер (ліва частина на десктопі, зверху на мобіль/планшет)
            ============================ */}
        <Grid item xs={12} md={6} className="main-slider-container">
          <Slider {...sliderSettings} className="main-slider">
            {images.map((src, idx) => (
              <Box key={idx} className="main-slide">
                <img
                  src={src}
                  alt={`Slide ${idx + 1}`}
                  className="main-slide__img"
                />
              </Box>
            ))}
          </Slider>
        </Grid>

        {/* ============================
            Текстовий блок (права частина на десктопі, під слайдером на мобіль/планшет)
            ============================ */}
        <Grid item xs={12} md={6} className="main-text-container">
          <Typography variant="h4" className="main-text-container__title" gutterBottom>
            Український державний університет науки і технологій (УДУНТ)
          </Typography>

          <Typography className="main-text-container__body" paragraph>
            УДУНТ — провідний багатогалузевий ЗВО у Дніпрі, де навчається понад 15 тис. студентів.
            Працює 950 викладачів (139 професорів, 523 доценти). До складу входить 6 інститутів,
            24 факультети, 121 кафедра та 21 навчальний корпус.
          </Typography>

          <Typography className="main-text-container__body" paragraph>
            <strong>Рейтинги:</strong> 5 місце в Scopus (Дніпро, 2023), 15 місце серед ЗВО України
            за наукову ефективність.
          </Typography>

          <Typography className="main-text-container__body" paragraph>
            <strong>Переваги:</strong> військова підготовка (6 спеціальностей), одна з найбільших
            бібліотек серед ЗВО, понад 2000 онлайн-курсів у Moodle, 21 гуртожиток із 100% забезпеченням.
          </Typography>

          <Typography className="main-text-container__body" paragraph>
            <strong>Інфраструктура:</strong> 2 спорткомплекси, 17 залів, стадіон, басейни, водні бази,
            безкоштовний Wi-Fi, геополігон, оздоровчі табори.
          </Typography>

          <Typography className="main-text-container__body" paragraph>
            <strong>Міжнародка:</strong> подвійні дипломи (Франція, Норвегія, Польща).{' '}
            <strong>Кар’єра:</strong> попит на випускників, підтримка роботодавців.
          </Typography>

          <Typography className="main-text-container__body" paragraph>
            <strong>Студентське життя:</strong> гуртки, палац культури, активний комітет.
            Навчання ведеться українською та англійською.
          </Typography>

          <Typography className="main-text-container__body">
            УДУНТ — це освіта, наука, спорт, комфортна інфраструктура та міжнародні можливості.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}
