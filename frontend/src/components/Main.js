// React та бібліотеки
import React from 'react';
import Slider from 'react-slick';

// MUI
import { Grid, Box, Typography } from '@mui/material';

// Стилі
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import mainStyles from '../assets/styles/MainStyles';


const images = [
  "/images/slide1.jpg",
  "/images/slide2.jpg",
  "/images/slide3.jpg"
];

// Кастомні стрілки
const NextArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{ ...mainStyles.sliderArrow, ...mainStyles.nextArrow }}
    className="slider-arrow"
  >
    <span style={{ fontSize: '30px', color: 'white' }}>›</span>
  </Box>
);

const PrevArrow = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{ ...mainStyles.sliderArrow, ...mainStyles.prevArrow }}
    className="slider-arrow"
  >
    <span style={{ fontSize: '30px', color: 'white' }}>‹</span>
  </Box>
);

const sliderSettings = {
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

const Main = () => {
  return (
    <Grid container sx={mainStyles.gridContainer}>
      {/* Слайдер */}
      <Grid
        item
        xs={12}
        md={6.4}
        sx={mainStyles.imageContainer}
        className="slider-container"
      >
        <Slider {...sliderSettings} style={mainStyles.slider}>
          {images.map((src, index) => (
            <Box
              key={index}
              component="img"
              src={src}
              alt={`Slide ${index + 1}`}
              sx={mainStyles.image}
            />
          ))}
        </Slider>
      </Grid>

      {/* Текстовий блок */}
      <Grid item xs={12} md={5.6} sx={mainStyles.textContainer}>
        <Typography sx={mainStyles.title}>
          Український державний університет науки і технологій (УДУНТ)
        </Typography>

        <Typography sx={mainStyles.bodyText} mt={2}>
          УДУНТ — провідний багатогалузевий ЗВО у Дніпрі, де навчається понад 15 тис. студентів. Працює 950 викладачів (139 професорів, 523 доценти). До складу входить 6 інститутів, 24 факультети, 121 кафедра та 21 навчальний корпус.
        </Typography>

        <Typography sx={mainStyles.bodyText} mt={2}>
          <strong>Рейтинги:</strong> 5 місце в Scopus (Дніпро, 2023), 15 місце серед ЗВО України за наукову ефективність.
        </Typography>

        <Typography sx={mainStyles.bodyText} mt={2}>
          <strong>Переваги:</strong> військова підготовка (6 спеціальностей), одна з найбільших бібліотек серед ЗВО, понад 2000 онлайн-курсів у Moodle, 21 гуртожиток із 100% забезпеченням.
        </Typography>

        <Typography sx={mainStyles.bodyText} mt={2}>
          <strong>Інфраструктура:</strong> 2 спорткомплекси, 17 залів, стадіон, басейни, водні бази, безкоштовний Wi-Fi, геополігон, оздоровчі табори.
        </Typography>

        <Typography sx={mainStyles.bodyText} mt={2}>
          <strong>Міжнародка:</strong> подвійні дипломи (Франція, Норвегія, Польща). <strong>Кар’єра:</strong> попит на випускників, підтримка роботодавців.
        </Typography>

        <Typography sx={mainStyles.bodyText} mt={2}>
          <strong>Студентське життя:</strong> гуртки, палац культури, активний комітет. Навчання ведеться українською та англійською.
        </Typography>

        <Typography sx={mainStyles.bodyText} mt={2}>
          УДУНТ — це освіта, наука, спорт, комфортна інфраструктура та міжнародні можливості.
        </Typography>
      </Grid>

    </Grid>
  );
};

export default Main;
