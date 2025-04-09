import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem, Box } from '@mui/material';
import headerStyles from '../assets/styles/HeaderStyles'; // Імпортуємо стилі

const Header = () => {
  const [specialitiesAnchor, setSpecialitiesAnchor] = useState(null);
  const [subMenuAnchor, setSubMenuAnchor] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const openSpecialitiesMenu = (event) => setSpecialitiesAnchor(event.currentTarget);
  const closeSpecialitiesMenu = () => {
    setSpecialitiesAnchor(null);
    setSubMenuAnchor(null);
    setSelectedCategory(null);
  };

  const openSubMenu = (event, category) => {
    setSubMenuAnchor(event.currentTarget);
    setSelectedCategory(category);
  };

  const closeSubMenu = () => {
    setSubMenuAnchor(null);
    setSelectedCategory(null);
  };

  const specialities = [
    {
      category: "Освіта, гуманітарні науки та мистецтво",
      items: [
        "014 Середня освіта",
        "015.12 Професійна освіта (металургія)",
        "017 Фізична культура і спорт",
        "022 Дизайн",
        "023 Образотворче мистецтво, декоративне мистецтво, реставрація",
        "029 Інформаційна, бібліотечна та архівна справа",
        "032 Історія та археологія",
        "035 Філологія",
      ],
    },
    {
      category: "Соціальні науки, управління та право",
      items: [
        "051 Економіка",
        "053 Психологія",
        "071 Облік і оподаткування",
        "072 Фінанси, банківська справа та страхування",
        "072 Фінанси, банківська справа, страхування та фондовий ринок",
        "073 Менеджмент",
        "075 Маркетинг",
        "076 Підприємництво, торгівля та біржова діяльність",
        "076 Підприємництво та торгівля",
        "281 Публічне управління та адміністрування",
        "292 Міжнародні економічні відносини",
        "232 Соціальне забезпечення",
      ],
    },
    {
      category: "Природничі науки",
      items: ["101 Екологія", "102 Хімія"],
    },
    {
      category: "Інформаційні технології та комп’ютерні науки",
      items: [
        "121 Інженерія програмного забезпечення",
        "122 Комп’ютерні науки",
        "123 Комп’ютерна інженерія",
        "125 Кібербезпека та захист інформації",
        "126 Інформаційні системи та технології",
      ],
    },
    {
      category: "Інженерія, техніка та виробництво",
      items: [
        "131 Прикладна механіка",
        "132 Матеріалознавство",
        "133 Галузеве машинобудування",
        "136 Металургія",
        "141 Електроенергетика, електротехніка та електромеханіка",
        "142 Енергетичне машинобудування",
        "144 Теплоенергетика",
        "151 Автоматизація та комп’ютерно-інтегровані технології",
        "152 Метрологія та інформаційно-вимірювальна техніка",
        "161 Хімічні технології та інженерія",
        "163 Біомедична інженерія",
        "174 Автоматизація, комп'ютерно-інтегровані технології та робототехніка",
        "175 Інформаційно-вимірювальні технології",
        "186 Видавництво та поліграфія",
      ],
    },
    {
      category: "Архітектура, будівництво та геодезія",
      items: [
        "192 Будівництво та цивільна інженерія",
        "193 Геодезія та землеустрій",
      ],
    },
    {
      category: "Транспорт, безпека та навколишнє середовище",
      items: [
        "183 Технології захисту навколишнього середовища",
        "263 Цивільна безпека",
        "273 Залізничний транспорт",
        "274 Автомобільний транспорт",
        "275 Транспортні технології (за видами)",
      ],
    },
  ];

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
            <Button
              color="inherit"
              onClick={openSpecialitiesMenu}
              sx={headerStyles.button}
            >
              Спеціальності
            </Button>
            <Menu
              anchorEl={specialitiesAnchor}
              open={Boolean(specialitiesAnchor)}
              onClose={closeSpecialitiesMenu}
            >
              {specialities.map((group) => (
                <div key={group.category}>
                  <MenuItem
                    onMouseEnter={(e) => openSubMenu(e, group.category)}
                    onClick={(e) => openSubMenu(e, group.category)}
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
                    >
                      {group.items.map((item) => (
                        <MenuItem key={item} onClick={closeSpecialitiesMenu}>
                          {item}
                        </MenuItem>
                      ))}
                    </Menu>
                  )}
                </div>
              ))}
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