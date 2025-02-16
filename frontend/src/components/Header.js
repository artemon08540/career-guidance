import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import headerStyles from '../assets/styles/HeaderStyles'; // Імпортуємо стилі

const Header = () => {
  const [specialitiesAnchor, setSpecialitiesAnchor] = useState(null);

  const openSpecialitiesMenu = (event) => setSpecialitiesAnchor(event.currentTarget);
  const closeSpecialitiesMenu = () => setSpecialitiesAnchor(null);

  return (
    <Box>
      {/* Верхня частина з логотипом та текстом */}
      <Box sx={headerStyles.logoContainer}>
        <img src="/images/logo.png" alt="University Logo" style={headerStyles.logo} />
        <Typography variant="h5" component="div" sx={headerStyles.title}>
          Профорієнтація абітурієнтів
        </Typography>
      </Box>

      {/* Навігаційне меню */}
      <AppBar position="static" sx={headerStyles.appBar}>
        <Toolbar sx={headerStyles.toolbar}>
          <div>
            <Button color="inherit" sx={headerStyles.button}>Головна</Button>
            <Button color="inherit" onClick={openSpecialitiesMenu} sx={headerStyles.button}>Спеціальності</Button>
            <Menu
              anchorEl={specialitiesAnchor}
              open={Boolean(specialitiesAnchor)}
              onClose={closeSpecialitiesMenu}
            >
              <MenuItem onClick={closeSpecialitiesMenu}>Комп'ютерна інженерія</MenuItem>
              <MenuItem onClick={closeSpecialitiesMenu}>Інженерія програмного забезпечення</MenuItem>
            </Menu>
            <Button color="inherit" sx={headerStyles.button}>Університет</Button>
            <Button color="inherit" sx={headerStyles.button}>Тест</Button>
          </div>
          <Button color="inherit" sx={headerStyles.button}>Увійти</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
