// src/components/Header.tsx
import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Dialog,
  Menu,
  MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../components/Header.css';

import LoginForm from './LoginForm.tsx';
import TestPage from './TestPage.tsx';

export default function Header() {
  const theme = useTheme();
  const isMobileOrTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Стан для діалогів “Увійти” та “Тест”
  const [loginOpen, setLoginOpen] = useState(false);
  const [testOpen, setTestOpen] = useState(false);

  // Стан для мобільного меню
  const [mobileMenuAnchorEl, setMobileMenuAnchorEl] = useState<null | HTMLElement>(null);
  const isMobileMenuOpen = Boolean(mobileMenuAnchorEl);

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuAnchorEl(null);
  };

  // Функції для відкриття/закриття діалогів
  const openLoginDialog = () => setLoginOpen(true);
  const closeLoginDialog = () => setLoginOpen(false);
  const openTestDialog = () => setTestOpen(true);
  const closeTestDialog = () => setTestOpen(false);

  // Пункти основного меню навігації (за потреби + “Спеціальності”)
  const navItems = [
    { label: 'Головна', href: '/' },
    { label: 'Університет', href: '/university' },
    { label: 'Тест', action: openTestDialog },
    // Якщо хочете, щоб “Спеціальності” просто було посиланням, можна вказати href:
    // { label: 'Спеціальності', href: '/specialities' },
    // або, як у цьому прикладі, просто вивести кнопку без дії.
  ];

  return (
    <>
      {/* ============================
          1) AppBar із color="primary"
          ============================ */}
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar className="header-toolbar">
          {/* ============================
              2) Логотип + Назва
              ============================ */}
          <Box className="header-logo">
            <img
              src="/images/logo.png"
              alt="University Logo"
              className="header-logo__img"
            />
            <Typography variant="h6" className="header-logo__text">
              Профорієнтація абітурієнтів
            </Typography>
          </Box>

          {/* ============================
              3) Якщо мобільний/планшет — іконка-меню,
                 інакше — горизонтальні кнопки
              ============================ */}
          {isMobileOrTablet ? (
            <>
              {/* Іконка гамбургера */}
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                size="large"
                className="header-menu-icon"
                onClick={handleMobileMenuOpen}
              >
                <MenuIcon />
              </IconButton>

              {/* Мобільне меню (випадаючий список) */}
              <Menu
                anchorEl={mobileMenuAnchorEl}
                open={isMobileMenuOpen}
                onClose={handleMobileMenuClose}
              >
                {navItems.map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => {
                      handleMobileMenuClose(); // Закриваємо меню при кліку
                      if (item.href) {
                        window.location.replace(item.href);
                      } else if (item.action) {
                        item.action();
                      }
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
                {/* “Спеціальності” — окремий пункт у мобільному меню */}
                <MenuItem
                  onClick={() => {
                    handleMobileMenuClose();
                    /* Можна додати тут логіку переходу або дії для “Спеціальності” */
                  }}
                >
                  Спеціальності
                </MenuItem>
                 {/* “Увійти” — окремий пункт у мобільному меню */}
                <MenuItem
                  onClick={() => {
                    handleMobileMenuClose();
                    openLoginDialog();
                  }}
                >
                  Увійти
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box className="header-nav">
              {/* ============================
                  4) Горизонтальні кнопки (десктоп)
                  ============================ */}
              {navItems.map((item) =>
                item.href ? (
                  <Button
                    key={item.label}
                    className="header-nav__button"
                    component="a"
                    href={item.href}
                    color="inherit"
                    disableRipple
                  >
                    {item.label}
                  </Button>
                ) : (
                  <Button
                    key={item.label}
                    className="header-nav__button"
                    onClick={() => {
                      if (item.action) item.action();
                    }}
                    color="inherit"
                    disableRipple
                  >
                    {item.label}
                  </Button>
                )
              )}

              {/* “Спеціальності” — звичайна кнопка без меню */}
              <Button
                className="header-nav__button"
                onClick={() => {
                  /* За бажанням — тут можна робити редірект або залишити пустим */
                }}
                color="inherit"
                disableRipple
              >
                Спеціальності
              </Button>

              {/* Кнопка “Увійти” */}
              <Button
                className="header-nav__button header-nav__button--login"
                onClick={openLoginDialog}
                color="inherit"
                disableRipple
              >
                Увійти
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* ============================
          5) Діалоги “Увійти” та “Тест”
          ============================ */}
      <Dialog open={loginOpen} onClose={closeLoginDialog} maxWidth="xs" fullWidth>
        <LoginForm />
      </Dialog>
      <Dialog open={testOpen} onClose={closeTestDialog} maxWidth="md" fullWidth>
        <TestPage />
      </Dialog>
    </>
  );
}
