import React from 'react';
import { Box, Typography, Link, Grid } from '@mui/material';

const Footer = () => (
  <Box component="footer" bgcolor="primary.main" color="white" p={2}>
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <Typography variant="body2">
          Адреса: м. Київ, вул. Прикладна, 2
        </Typography>
        <Typography variant="body2">
          Телефон: +38 123 456 78 90
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <Typography variant="body2">Соціальні мережі:</Typography>
        <Link href="#" color="inherit" sx={{ marginRight: 1 }}>Facebook</Link>
        <Link href="#" color="inherit" sx={{ marginRight: 1 }}>Telegram</Link>
        <Link href="#" color="inherit" sx={{ marginRight: 1 }}>Instagram</Link>
      </Grid>
    </Grid>
  </Box>
);

export default Footer;
