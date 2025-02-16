import React from 'react';
import Slider from 'react-slick';
import { Grid, Box, Typography } from '@mui/material';
import mainStyles from '../assets/styles/MainStyles';

// Імпортуємо стилі для слайдера
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const images = [
  "/images/slide1.jpg",
  "/images/slide2.jpg",
  "/images/slide3.jpg"
];

// Кастомні стрілки
const NextArrow = ({ onClick }) => (
  <Box onClick={onClick} sx={{ ...mainStyles.sliderArrow, ...mainStyles.nextArrow }} className="slider-arrow">
    <span style={{ fontSize: '30px', color: 'white' }}>›</span>
  </Box>
);

const PrevArrow = ({ onClick }) => (
  <Box onClick={onClick} sx={{ ...mainStyles.sliderArrow, ...mainStyles.prevArrow }} className="slider-arrow">
    <span style={{ fontSize: '30px', color: 'white' }}>‹</span>
  </Box>
);


const Main = () => {
  // Налаштування слайдера
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Grid container sx={mainStyles.gridContainer}>
      {/* Ліва частина: Слайдер */}
      <Grid item xs={12} md={6.4} sx={mainStyles.imageContainer} className="slider-container">
        <Slider {...settings} style={mainStyles.slider}>
          {images.map((src, index) => (
            <Box key={index} component="img" src={src} alt={`Slide ${index + 1}`} sx={mainStyles.image} />
          ))}
        </Slider>
      </Grid>

      {/* Права частина з текстом */}
      <Grid item xs={12} md={5.6} sx={mainStyles.textContainer}>
        <Typography sx={mainStyles.title}>Заголовок на головній сторінці сайту</Typography>
        <Typography sx={mainStyles.bodyText}>
          Текст текст текст текст текст текст текст текст текст текст текст текст текст текст
          текст текст текст текст текст текст текст текст текст текст текст текст текст текст.
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Main;
