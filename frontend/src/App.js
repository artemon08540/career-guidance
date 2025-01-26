import React from 'react';
import { Container, AppBar, Toolbar, Typography, Box, Button } from '@mui/material';

const App = () => (
  <Container maxWidth="lg">
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">Career Guidance</Typography>
      </Toolbar>
    </AppBar>
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        Ласкаво просимо до Career Guidance
      </Typography>
      <Button variant="contained" color="primary">
        Розпочати тест
      </Button>
    </Box>
  </Container>
);

export default App;
