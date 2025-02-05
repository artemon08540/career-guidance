import React from 'react';
import { Container, Grid, Box, Typography } from '@mui/material';

const Main = () => {
  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3} alignItems="center" sx={{ height: '80vh' }}>
        {/* Ліва частина з картинкою */}
        <Grid item xs={12} md={5}>
          <Box
            component="img"
            src="/images/slide1.jpg"
            alt="University Building"
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: '8px',
            }}
          />
        </Grid>

        {/* Права частина з текстом */}
        <Grid item xs={12} md={7}>
          <Box>
            <Typography variant="h4" gutterBottom>
              Заголовок на головній сторінці сайту
            </Typography>
            <Typography variant="body1">
              Текст текст текст текст текст текст текст текст текст текст текст текст текст текст
              текст текст текст текст текст текст текст текст текст текст текст текст текст текст.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Main;
