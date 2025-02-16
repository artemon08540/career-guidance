import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';
import footerStyles from '../assets/styles/FooterStyles';

const Footer = () => {
  return (
    <Box sx={footerStyles.container}>
      <Container>
        <Grid container spacing={2} justifyContent="space-between" alignItems="center">
          {/* Ліва частина - Логотип */}
          <Grid item xs={12} md={2} sx={footerStyles.logoContainer}>
            <img src="/images/logo2.png" alt="University Logo" style={footerStyles.logo} />
          </Grid>

          {/* Центральна частина - Інформація про університет */}
          <Grid item xs={12} md={6} sx={footerStyles.infoContainer}>
            <Typography sx={footerStyles.universityName}>
              Український державний університет науки і технологій
            </Typography>
            <Typography sx={footerStyles.infoText}>49010, Україна, м. Дніпро, вул. Лазаряна, 2</Typography>
            <Typography sx={footerStyles.infoText}>Email: office@ust.edu.ua</Typography>
            <Typography sx={footerStyles.infoText}>Приймальня ректора: +38 (056) 793-19-00</Typography>
            <Typography sx={footerStyles.infoText}>Загальний відділ: +38 (056) 373-15-05</Typography>
          </Grid>

          {/* Права частина - Соцмережі */}
          <Grid item xs={12} md={4} sx={footerStyles.socialContainer}>
            <Box sx={footerStyles.socialLinks}>
              <Link href="#" sx={footerStyles.socialIcon}><img src="/images/facebook-icon.png" alt="Facebook" /></Link>
              <Link href="#" sx={footerStyles.socialIcon}><img src="/images/telegram-icon.png" alt="Telegram" /></Link>
              <Link href="#" sx={footerStyles.socialIcon}><img src="/images/youtube-icon.png" alt="YouTube" /></Link>
              <Link href="#" sx={footerStyles.socialIcon}><img src="/images/instagram-icon.png" alt="Instagram" /></Link>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
