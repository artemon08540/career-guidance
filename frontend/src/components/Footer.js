import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import footerStyles from '../assets/styles/FooterStyles';

const Footer = () => {
  return (
    <Box sx={footerStyles.container}>
      <Container>
        <Grid container spacing={footerStyles.gridContainer.spacing}>
          <Grid item xs={12} md={6}>
            <Typography>Український державний університет науки і технологій</Typography>
            <Typography>49010, Україна, м. Дніпро, вул. Лазаряна, 2</Typography>
            <Typography>Телефон: +38 123 456 78 90</Typography>
          </Grid>
          <Grid item xs={12} md={6} sx={footerStyles.textAlignRight}>
            <Typography>Соціальні мережі:</Typography>
            <Typography>
              <a href="#" style={footerStyles.link}>Facebook</a>
              <a href="#" style={footerStyles.link}>Telegram</a>
              <a href="#" style={footerStyles.link}>Instagram</a>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
