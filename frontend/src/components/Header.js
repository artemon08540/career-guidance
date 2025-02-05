import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box } from '@mui/material';

const Header = () => {
  const [specialitiesAnchor, setSpecialitiesAnchor] = useState(null);

  const openSpecialitiesMenu = (event) => setSpecialitiesAnchor(event.currentTarget);
  const closeSpecialitiesMenu = () => setSpecialitiesAnchor(null);

  return (
    <Box>
      {/* Верхня частина з логотипом та текстом */}
      <Box sx={{ bgcolor: '#FFFFFF', color: '#005782', p: 2, display: 'flex', alignItems: 'center' }}>
        <img
          src="/images/logo.png"
          alt="University Logo"
          style={{ height: '50px', marginRight: '10px' }}
        />
        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
          Профорієнтація абітурієнтів
        </Typography>
      </Box>

      {/* Навігаційне меню */}
      <AppBar position="static" sx={{ bgcolor: '#005782', color: '#FFFFFF' }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <div>
            <Button color="inherit" sx={{ marginRight: '10px' }}>
              Головна
            </Button>
            <Button color="inherit" onClick={openSpecialitiesMenu} sx={{ marginRight: '10px' }}>
              Спеціальності
            </Button>
            <Menu
              anchorEl={specialitiesAnchor}
              open={Boolean(specialitiesAnchor)}
              onClose={closeSpecialitiesMenu}
            >
              <MenuItem onClick={closeSpecialitiesMenu}>Комп'ютерна інженерія</MenuItem>
              <MenuItem onClick={closeSpecialitiesMenu}>Інженерія програмного забезпечення</MenuItem>
            </Menu>
            <Button color="inherit" sx={{ marginRight: '10px' }}>
              Університет
            </Button>
            <Button color="inherit" sx={{ marginRight: '10px' }}>
              Тест
            </Button>
          </div>
          <Button color="inherit">Увійти</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
