const footerStyles = {
  container: {
    bgcolor: '#005782',
    color: 'white',
    py: 2, // Padding Y (залишаємо для внутрішніх відступів)
    mt: 0, // Прибираємо зовнішній верхній відступ, який створював зазор
  },
  gridContainer: {
    spacing: 2, // Прибираємо зайві відступи між елементами в Grid
  },
  textAlignRight: {
    textAlign: { xs: 'left', md: 'right' },
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    marginRight: '10px',
  },
};

export default footerStyles;
