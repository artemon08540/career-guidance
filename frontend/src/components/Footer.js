import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: '#005782', color: 'white', py: 2, mt: 4 }}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography>Український державний університет науки і технологій
            49010, Україна, м. Дніпро, вул. Лазаряна, 2</Typography>
            <Typography>Телефон: +38 123 456 78 90</Typography>
          </Grid>
          <Grid item xs={12} md={6} textAlign={{ xs: 'left', md: 'right' }}>
            <Typography>Соціальні мережі:</Typography>
            <Typography>
              <a href="#" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>Facebook</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}>Telegram</a>
              <a href="#" style={{ color: 'white', textDecoration: 'none' }}>Instagram</a>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
