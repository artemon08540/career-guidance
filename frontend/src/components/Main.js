// src/components/Main.jsx

import React from 'react';
import Slider from 'react-slick';
import { Grid, Box, Typography, useTheme, useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Main.css';

const slides = [
  { src: '/images/slide1.jpg', alt: 'Slide 1', action: 'test' },
  { src: '/images/slide2.jpg', alt: 'Slide 2', action: '/university' },
  { src: '/images/slide3.jpg', alt: 'Slide 3', action: '/specialties' },
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

  const sliderSettings = {
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

  const handleSlideClick = (action) => {
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
          <Slider {...sliderSettings} className="main-slider">
            {slides.map(({ src, alt, action }, idx) => (
              <Box
                key={idx}
                className="main-slide"
                onClick={() => handleSlideClick(action)}
                sx={{ cursor: 'pointer' }}
              >
                <img src={src} alt={alt} className="main-slide__img" />
              </Box>
            ))}
          </Slider>
        </Grid>

        {/* Текстовый блок */}
        <Grid item xs={12} md={6} className="main-text-container">
          <Typography
            variant="h4"
            className="main-text-container__title"
            gutterBottom
          >
            Твоя кар'єра починається прямо зараз!
          </Typography>

          <Typography
            className="main-text-container__subtitle"
            paragraph
          >
            Український державний університет науки і технологій (УДУНТ) — це не просто
            місце для навчання. Тут формується майбутнє кожного студента, відкриваються
            можливості для успішної кар’єри, наукових досліджень та міжнародних обмінів.
          </Typography>

          <Box className="main-bullet-list">
            {[
              {
                bold: 'Понад 15 000 студентів',
                text: ' у 6 інститутах та 24 факультетах, що гарантує мультидисциплінарне середовище та активний студентський рух.',
              },
              {
                bold: '950 викладачів',
                text: ' (139 професорів, понад 500 доцентів) — провідні експерти у своїх галузях, які поєднують наукові дослідження та практику.',
              },
              {
                bold: 'Сучасна інфраструктура',
                text: ': 21 гуртожиток із 100 % забезпеченням, 2 спорткомплекси (4 зали), 3 басейни, Wi-Fi на всій території, ботанічний сад та геологічний полігон.',
              },
              {
                bold: 'Міжнародні програми',
                text: ': можливість отримати подвійний диплом у партнерських університетах Франції, Норвегії, Польщі.',
              },
              {
                bold: 'Працевлаштування та стажування',
                text: ': стабільний попит на наших випускників, партнерські компанії, внутрішні стажування та гранти.',
              },
            ].map((item, i) => (
              <Typography
                key={i}
                component="div"
                className="main-text-container__body"
              >
                <Box component="span" className="main-bullet-marker" />
                <Box component="span">
                  <strong>{item.bold}</strong>
                  {item.text}
                </Box>
              </Typography>
            ))}
          </Box>

          <Typography
            className="main-text-container__quote"
            paragraph
          >
            “УДУНТ — це не просто освіта. Це успішний старт твоєї майбутньої кар’єри,
            дружня команда однодумців і справжньо європейські можливості.”
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
