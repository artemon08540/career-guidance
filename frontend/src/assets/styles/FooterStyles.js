const footerStyles = {
  container: {
    bgcolor: '#1D1D1D', // Темний фон
    color: 'white',
    py: 3,
    mt: 0,
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  logo: {
    width: '170px', 
    height: '73px',
  },
  infoContainer: {
    textAlign: 'left',
  },
  universityName: {
    fontFamily: '"Inter", sans-serif',
    fontWeight: 300, // Light стиль
    fontSize: '12px',
    marginBottom: '8px',
  },
  infoText: {
    fontFamily: '"Inter", sans-serif',
    fontWeight: 300,
    fontSize: '12px',
    marginBottom: '4px',
  },
  socialContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  socialLinks: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '12px',
  },
  socialIcon: {
    display: 'inline-block',
    '& img': {
      width: '70px', // Масштабую відповідно до макету
      height: '70px',
    },
  },
};

export default footerStyles;
