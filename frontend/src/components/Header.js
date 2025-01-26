import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import LoginModal from './LoginModal';

const Header = () => {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Профорієнтація абітурієнтів
        </Typography>
        <Button color="inherit">Головна</Button>
        <Button color="inherit">Спеціальності</Button>
        <Button color="inherit">Університет</Button>
        <Button color="inherit">Тест</Button>
        <LoginModal /> {/* Використання модального вікна */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
