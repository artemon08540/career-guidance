const mainStyles = {
  container: {
    mt: 4,
    minHeight: '100vh',
    display: 'flex',
    marginBottom: 0,
    paddingBottom: 0,
    alignItems: 'center'
  },
  gridContainer: {
    minHeight: '100vh', // ✅ замість height
    display: 'flex',
    alignItems: 'stretch',
  },
  imageContainer: {
    position: 'relative', // Важливо для позиціонування стрілок
    width: '100%',
    overflow: 'hidden', // Запобігає виходу стрілок за межі контейнера
  },
  image: {
    width: '100%',
    minHeight: '100vh',
    objectFit: 'cover',
    borderRadius: '0px',
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    minHeight: '100vh',
    padding: '40px',
    boxSizing: 'border-box',
  },
  title: {
    fontFamily: '"Inter", sans-serif',
    fontWeight: 600,
    fontSize: '32px',
    gutterBottom: true,
  },
  bodyText: {
    fontFamily: '"Inter", sans-serif',
    fontSize: '18px',
  },

  // СТИЛІ СТРІЛОК
  sliderArrow: {
    position: 'absolute',
    top: 0,
    width: '60px', // Прямокутна стрілка на всю висоту
    minHeight: '100vh', // Обмеження висоти стрілок висотою слайдера
    background: 'rgba(0, 0, 0, 0.2)', // Напівпрозорий фон
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    zIndex: 10,
    opacity: 0, // Початково невидима
    transition: 'opacity 0.3s ease-in-out, background 0.3s ease-in-out',
  
    '&:hover': { 
      opacity: 1, // Робимо видимою при наведенні
      background: 'rgba(0, 0, 0, 0.4)',
    },
  },
  
  nextArrow: {
    right: 0,
  },
  prevArrow: {
    left: 0,
  },
  arrowIcon: {
    fontSize: '30px',
    color: 'white',
  },
};

export default mainStyles;
