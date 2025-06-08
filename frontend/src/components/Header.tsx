// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
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
import { Link as RouterLink } from 'react-router-dom';
import './Header.css';

import LoginForm from './LoginForm.tsx';
import TestPage from './TestPage.tsx';

type NavItem =
  | { label: string; href: string }
  | { label: string; action: () => void };

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const [user, setUser] = useState<{ username: string } | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [testOpen, setTestOpen] = useState(false);
  const [mobileAnchor, setMobileAnchor] = useState<null | HTMLElement>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const u = JSON.parse(stored);
        setUser({ username: u.username || u.email || 'Експерт' });
      } catch {}
    }
  }, []);

  const baseNav: NavItem[] = [
    { label: 'Головна', href: '/' },
    { label: 'Університет', href: '/university' },
    { label: 'Тест', action: () => setTestOpen(true) },
    { label: 'Спеціальності', href: '/specialties' },
  ];

  if (user) {
    baseNav.push(
      { label: `Привіт, ${user.username}`, action: () => {} },
      {
        label: 'Вийти',
        action: () => {
          localStorage.removeItem('jwt');
          localStorage.removeItem('user');
          setUser(null);
        },
      }
    );
  } else {
    baseNav.push({ label: 'Увійти', action: () => setLoginOpen(true) });
  }

  const openMenu = (e: React.MouseEvent<HTMLElement>) => setMobileAnchor(e.currentTarget);
  const closeMenu = () => setMobileAnchor(null);

  return (
    <>
      <AppBar position="static" color="primary" elevation={0}>
        <Toolbar className="header-toolbar">
          {/* ЛОГО+ТЕКСТ — з посиланням на "/" */}
          <RouterLink to="/" className="header-brand">
            <img src="/images/logo.png" alt="Logo" className="header-logo__img" />
            <Typography variant="h6" className="header-logo__text">
              Профорієнтація абітурієнтів
            </Typography>
          </RouterLink>

          {isMobile ? (
            <>
              <IconButton edge="end" color="inherit" onClick={openMenu}>
                <MenuIcon />
              </IconButton>
              <Menu anchorEl={mobileAnchor} open={!!mobileAnchor} onClose={closeMenu}>
                {baseNav.map((item) => (
                  <MenuItem
                    key={item.label}
                    onClick={() => {
                      closeMenu();
                      if ('href' in item) window.location.href = item.href;
                      else item.action();
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Box className="header-nav">
              {baseNav.map((item) =>
                'href' in item ? (
                  <Button
                    key={item.label}
                    className="header-nav__button"
                    component={RouterLink}
                    to={item.href}
                    color="inherit"
                    disableRipple
                  >
                    {item.label}
                  </Button>
                ) : (
                  <Button
                    key={item.label}
                    className="header-nav__button"
                    onClick={item.action}
                    color="inherit"
                    disableRipple
                  >
                    {item.label}
                  </Button>
                )
              )}
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Dialog open={loginOpen} onClose={() => setLoginOpen(false)} maxWidth="xs" fullWidth>
        <LoginForm
          onLoginSuccess={(uname) => {
            setUser({ username: uname });
            setLoginOpen(false);
          }}
        />
      </Dialog>
      <Dialog open={testOpen} onClose={() => setTestOpen(false)} maxWidth="md" fullWidth>
        <TestPage />
      </Dialog>
    </>
  );
}
