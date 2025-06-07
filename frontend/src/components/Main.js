// src/components/Main.jsx

import React from 'react';
import Slider from 'react-slick';
import { Grid, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.css';

const slides = [
  { src: '/images/slide1.jpg', alt: 'Пройти тестування', action: 'test' },
  { src: '/images/slide2.jpg', alt: 'Про університет', action: '/university' },
  { src: '/images/slide3.jpg', alt: 'Спеціальності', action: '/specialties' },
];

const NextArrow = ({ onClick }) => (
  <Box className="main-slider__arrow main-slider__arrow--next" onClick={onClick}>
    ›
  </Box>
);

const PrevArrow = ({ onClick }) => (
  <Box className="main-slider__arrow main-slider__arrow--prev" onClick={onClick}>
    ‹
  </Box>
);

export default function Main({ openTestDialog }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: !isMobile,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  const onSlideClick = (action) => {
    if (action === 'test') {
      openTestDialog?.();
    } else {
      navigate(action);
    }
  };

  return (
    <Box component="main" className="main-root">
      <Grid
        container
        className="main-grid"
        direction={isMobile || isTablet ? 'column' : 'row'}
      >
        {/* Слайдер */}
        <Grid item xs={12} md={6} className="main-slider-container">
          <Slider {...settings} className="main-slider">
            {slides.map(({ src, alt, action }, idx) => (
              <Box
                key={idx}
                className="main-slide"
                onClick={() => onSlideClick(action)}
                sx={{ cursor: 'pointer' }}
              >
                <img src={src} alt={alt} className="main-slide__img" />
              </Box>
            ))}
          </Slider>
        </Grid>

        {/* Текстова частина */}
        <Grid item xs={12} md={6} className="main-text-container">
          <Typography variant="h4" className="main-text-container__title" gutterBottom>
            Твоя кар’єра починається прямо зараз!
          </Typography>

          <Typography variant="subtitle1" paragraph className="main-text-container__subtitle">
            Український державний університет науки і технологій (УДУНТ) — це не просто місце
            для навчання. Тут формується твоє майбутнє, відкриваються можливості для кар’єри,
            науки та міжнародних обмінів.
          </Typography>

          <Box className="main-bullet-list">
            {[
              {
                bold: 'Понад 15 000 студентів',
                text: ' у 6 інститутах та 24 факультетах — мультидисциплінарне середовище.',
              },
              {
                bold: '950 викладачів',
                text: ' (139 професорів, 523 доценти) — провідні експерти-практики.',
              },
              {
                bold: 'Сучасна інфраструктура',
                text: ' (21 гуртожиток, спорткомплекси, 3 басейни, Wi-Fi), ботанічний сад.',
              },
              {
                bold: 'Міжнародні програми',
                text: ' — подвійні дипломи з Франції, Норвегії та Польщі.',
              },
              {
                bold: 'Працевлаштування',
                text: ' — гарантії від роботодавців, стажування та гранти.',
              },
            ].map((item, i) => (
              <Typography component="div" key={i} className="main-text-container__body">
                <Box component="span" className="main-bullet-marker" />
                <Box component="span">
                  <strong>{item.bold}</strong>
                  {item.text}
                </Box>
              </Typography>
            ))}
          </Box>

          <Typography component="blockquote" className="main-text-container__quote" paragraph>
            “УДУНТ — це успішний старт твоєї кар’єри та справжні європейські можливості.”
          </Typography>

          <Box className="main-cta-container">
            <a
              href="https://pk.ust.edu.ua/"
              target="_blank"
              rel="noopener noreferrer"
              className="main-cta-link"
            >
              Перейти до Приймальної комісії
            </a>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
