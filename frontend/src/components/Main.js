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
            Оновлений текстовий блок:
            більше інформативного контенту 
            та кнопка до Приймальної комісії
            ============================ */}
        <Grid item xs={12} md={6} className="main-text-container">
          {/* Заголовок */}
          <Typography
            variant="h4"
            className="main-text-container__title"
            gutterBottom
          >
            Твоя кар'єра починається прямо зараз!
          </Typography>

          {/* Короткий вступний текст */}
          <Typography
            className="main-text-container__subtitle"
            paragraph
          >
            Український державний університет науки і технологій (УДУНТ) — це не просто
            місце для навчання. Тут формується майбутнє кожного студента, відкриваються
            можливості для успішної кар’єри, наукових досліджень та міжнародних обмінів.
          </Typography>

          {/* Розширений перелік переваг */}
          <Box className="main-bullet-list">
            {/* Перший пункт */}
            <Typography
              component="div"
              className="main-text-container__body"
            >
              <Box component="span" className="main-bullet-marker" />
              <Box component="span" className="main-bullet-text">
                <strong>Понад 15 000 студентів</strong> у 6 інститутах та 24 факультетах,
                що гарантує мультидисциплінарне середовище та активний студентський рух.
              </Box>
            </Typography>

            {/* Другий пункт */}
            <Typography
              component="div"
              className="main-text-container__body"
            >
              <Box component="span" className="main-bullet-marker" />
              <Box component="span" className="main-bullet-text">
                <strong>950 викладачів</strong> (139 професорів, понад 500 доцентів) — 
                провідні експерти у своїх галузях, які поєднують наукові дослідження та практику.
              </Box>
            </Typography>

            {/* Третій пункт */}
            <Typography
              component="div"
              className="main-text-container__body"
            >
              <Box component="span" className="main-bullet-marker" />
              <Box component="span" className="main-bullet-text">
                <strong>Сучасна інфраструктура:</strong> 21 гуртожиток із 100 % 
                забезпеченням, 2 спорткомплекси (4 зали), 3 басейни, Wi-Fi на всій території, 
                ботані́чний сад та геологічний полігон.
              </Box>
            </Typography>

            {/* Четвертий пункт */}
            <Typography
              component="div"
              className="main-text-container__body"
            >
              <Box component="span" className="main-bullet-marker" />
              <Box component="span" className="main-bullet-text">
                <strong>Міжнародні програми:</strong> можливість отримати 
                <strong> подвійний диплом</strong> у партнерських університетах Франції, Норвегії, Польщі.
              </Box>
            </Typography>

            {/* П’ятий пункт */}
            <Typography
              component="div"
              className="main-text-container__body"
            >
              <Box component="span" className="main-bullet-marker" />
              <Box component="span" className="main-bullet-text">
                <strong>Працевлаштування та стажування:</strong> 
                стабільний попит на наших випускників, партнерські компанії, 
                внутрішні стажування та гранти.
              </Box>
            </Typography>
          </Box>

          {/* Додаткова секція з короткою інформацією */}
          <Typography
            className="main-text-container__quote"
            paragraph
          >
            “УДУНТ — це не просто освіта. Це успішний старт твоєї майбутньої кар’єри, 
            дружня команда однодумців і справжньо європейські можливості.”
          </Typography>

          {/* Заклик до дії: перехід на сторінку Приймальної комісії */}
          <Box className="main-cta-container">
            <a href="/admission" className="main-cta-link">
              Перейти до Приймальної комісії
            </a>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
