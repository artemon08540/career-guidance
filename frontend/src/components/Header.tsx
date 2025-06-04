// src/components/Header.tsx

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Box,
  useMediaQuery,
  useTheme,
  Dialog,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import '../components/Header.css';

import LoginForm from './LoginForm.tsx';
import TestPage from './TestPage.tsx';

export default function Header() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Стан для “Спеціальностей”
  const [specialitiesAnchor, setSpecialitiesAnchor] = useState<null | HTMLElement>(null);
  const [subMenuAnchor, setSubMenuAnchor] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Стан для діалогів
  const [loginOpen, setLoginOpen] = useState(false);
  const [testOpen, setTestOpen] = useState(false);

  // Дані меню “Спеціальності” (приклад)
  const specialities = [
    {
      category: 'Освіта, гуманітарні науки та мистецтво',
      items: [
        '014 Середня освіта',
        '015.12 Професійна освіта (металургія)',
        '017 Фізична культура і спорт',
        '022 Дизайн',
        '023 Образотворче мистецтво, декоративне мистецтво, реставрація',
        '029 Інформаційна, бібліотечна та архівна справа',
        '032 Історія та археологія',
        '035 Філологія',
      ],
    },
    {
      category: 'Соціальні науки, управління та право',
      items: [
        '051 Економіка',
        '053 Психологія',
        '071 Облік і оподаткування',
        '072 Фінанси, банківська справа та страхування',
        '072 Фінанси, банківська справа, страхування та фондовий ринок',
        '073 Менеджмент',
        '075 Маркетинг',
        '076 Підприємництво, торгівля та біржова діяльність',
        '076 Підприємництво та торгівля',
        '281 Публічне управління та адміністрування',
        '292 Міжнародні економічні відносини',
        '232 Соціальне забезпечення',
      ],
    },
    {
      category: 'Природничі науки',
      items: ['101 Екологія', '102 Хімія'],
    },
    {
      category: 'Інформаційні технології та комп’ютерні науки',
      items: [
        '121 Інженерія програмного забезпечення',
        '122 Комп’ютерні науки',
        '123 Комп’ютерна інженерія',
        '125 Кібербезпека та захист інформації',
        '126 Інформаційні системи та технології',
      ],
    },
    {
      category: 'Інженерія, техніка та виробництво',
      items: [
        '131 Прикладна механіка',
        '132 Матеріалознавство',
        '133 Галузеве машинобудування',
        '136 Металургія',
        '141 Електроенергетика, електротехніка та електромеханіка',
        '142 Енергетичне машинобудування',
        '144 Теплоенергетика',
        '151 Автоматизація та комп’ютерно-інтегровані технології',
        '152 Метрологія та інформаційно-вимірювальна техніка',
        '161 Хімічні технології та інженерія',
        '163 Біомедична інженерія',
        "174 Автоматизація, комп'ютерно-інтегровані технології та робототехніка",
        '175 Інформаційно-вимірювальні технології',
        '186 Видавництво та поліграфія',
      ],
    },
    {
      category: 'Архітектура, будівництво та геодезія',
      items: ['192 Будівництво та цивільна інженерія', '193 Геодезія та землеустрій'],
    },
    {
      category: 'Транспорт, безпека та навколишнє середовище',
      items: [
        '183 Технології захисту навколишнього середовища',
        '263 Цивільна безпека',
        '273 Залізничний транспорт',
        '274 Автомобільний транспорт',
        '275 Транспортні технології (за видами)',
      ],
    },
  ];

  // Обробники меню “Спеціальності”
  const openSpecialitiesMenu = (e: React.MouseEvent<HTMLElement>) =>
    setSpecialitiesAnchor(e.currentTarget);
  const closeSpecialitiesMenu = () => {
    setSpecialitiesAnchor(null);
    setSubMenuAnchor(null);
    setSelectedCategory(null);
  };
  const openSubMenu = (e: React.MouseEvent<HTMLElement>, category: string) => {
    setSelectedCategory(category);
    setSubMenuAnchor(e.currentTarget);
  };
  const closeSubMenu = () => {
    setSubMenuAnchor(null);
    setSelectedCategory(null);
  };

  // Обробники діалогів
  const openLoginDialog = () => setLoginOpen(true);
  const closeLoginDialog = () => setLoginOpen(false);
  const openTestDialog = () => setTestOpen(true);
  const closeTestDialog = () => setTestOpen(false);

  // Пункти основного навігаційного меню
  const navItems = [
    { label: 'Головна', href: '/' },
    { label: 'Університет', href: '/university' },
    { label: 'Тест', action: openTestDialog },
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
            <img src="/images/logo.png" alt="University Logo" className="header-logo__img" />
            <Typography variant="h6" className="header-logo__text">
              Профорієнтація абітурієнтів
            </Typography>
          </Box>

          {/* ============================
              3) Якщо мобільний — іконка-меню,
                 інакше — горизонтальні кнопки
              ============================ */}
          {isMobile ? (
            <>
              <IconButton
                edge="end"
                color="inherit"               /* Наслідує білий колір text із primary.contrastText */
                aria-label="menu"
                onClick={openSpecialitiesMenu}
                size="large"
                className="header-menu-icon"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={specialitiesAnchor}
                open={Boolean(specialitiesAnchor)}
                onClose={closeSpecialitiesMenu}
                className="header-dropdown-menu"
              >
                {/* У мобільному режимі показуємо спочатку всі “Спеціальності” */}
                {specialities.map((group) => (
                  <React.Fragment key={group.category}>
                    <MenuItem
                      onClick={(e) => openSubMenu(e, group.category)}
                      className="header-dropdown-menu__item-group"
                    >
                      {group.category}
                    </MenuItem>
                    {selectedCategory === group.category && (
                      <Menu
                        anchorEl={subMenuAnchor}
                        open={Boolean(subMenuAnchor)}
                        onClose={closeSubMenu}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        className="header-dropdown-submenu"
                      >
                        {group.items.map((item) => (
                          <MenuItem key={item} onClick={closeSpecialitiesMenu}>
                            {item}
                          </MenuItem>
                        ))}
                      </Menu>
                    )}
                  </React.Fragment>
                ))}

                {/* Додаємо інші navItems у тому ж меню */}
                <MenuItem onClick={() => window.location.replace('/')}>Головна</MenuItem>
                <MenuItem onClick={() => window.location.replace('/university')}>
                  Університет
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    closeSpecialitiesMenu();
                    openTestDialog();
                  }}
                >
                  Тест
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    closeSpecialitiesMenu();
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
                    color="inherit"      /* Білий текст */
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
                    color="inherit"      /* Білий текст */
                    disableRipple
                  >
                    {item.label}
                  </Button>
                )
              )}

              {/* Кнопка “Спеціальності” */}
              <Button
                className="header-nav__button"
                onClick={openSpecialitiesMenu}
                color="inherit"
                disableRipple
              >
                Спеціальності
              </Button>
              <Menu
                anchorEl={specialitiesAnchor}
                open={Boolean(specialitiesAnchor)}
                onClose={closeSpecialitiesMenu}
                className="header-dropdown-menu"
              >
                {specialities.map((group) => (
                  <React.Fragment key={group.category}>
                    <MenuItem
                      onMouseEnter={(e) => openSubMenu(e, group.category)}
                      onClick={(e) => openSubMenu(e, group.category)}
                      className="header-dropdown-menu__item-group"
                    >
                      {group.category}
                    </MenuItem>
                    {selectedCategory === group.category && (
                      <Menu
                        anchorEl={subMenuAnchor}
                        open={Boolean(subMenuAnchor)}
                        onClose={closeSubMenu}
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                        className="header-dropdown-submenu"
                      >
                        {group.items.map((item) => (
                          <MenuItem key={item} onClick={closeSpecialitiesMenu}>
                            {item}
                          </MenuItem>
                        ))}
                      </Menu>
                    )}
                  </React.Fragment>
                ))}
              </Menu>

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
