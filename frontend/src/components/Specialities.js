import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const Specialities = ({ specialities }) => (
  <Grid container spacing={2}>
    {specialities.map((spec) => (
      <Grid item xs={12} sm={6} md={4} key={spec.id}>
        <Card>
          <CardContent>
            <Typography variant="h5">{spec.name}</Typography>
            <Typography>{spec.description}</Typography>
          </CardContent>
        </Card>
      </Grid>
    ))}
  </Grid>
);

export default Specialities;
