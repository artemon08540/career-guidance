import React from 'react';
import { Container, Typography, Grid } from '@mui/material';

const Home = () => (
  <Container>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography variant="h4">Заголовок на головній сторінці сайту</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography>
          Текст текст текст текст текст текст текст текст текст текст текст текст
        </Typography>
      </Grid>
    </Grid>
  </Container>
);

export default Home;
