// src/components/University.jsx

import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import './University.css';  // Правильний шлях до CSS

export default function University() {
  return (
    <Box component="main" className="university-root">
      <Container maxWidth="lg" className="university-container">
        {/* Заголовок */}
        <Typography variant="h3" className="university-title" gutterBottom>
          Про Український державний університет науки і технологій
        </Typography>

        {/* Короткий вступ */}
        <Typography variant="body1" className="university-intro" paragraph>
          Український державний університет науки і технологій (УДУНТ) — це сучасний
          заклад вищої освіти у місті Дніпро, що поєднує наукові досягнення, потужну
          практичну підготовку та міжнародні можливості. Наша мета — формувати конкурентоспроможних
          фахівців, які здатні вирішувати захоплюючі виклики сьогодення.
        </Typography>

        {/* Секції */}
        <Grid container spacing={4} className="university-sections">
          {/* 1. Історія */}
          <Grid item xs={12} sm={6} className="university-section">
            <Typography variant="h5" className="university-section-title" gutterBottom>
              Історія
            </Typography>
            <Typography variant="body2" className="university-section-text" paragraph>
              УДУНТ засновано у 1964 році як Інститут машинобудування та автоматизації. 
              За понад півстолітню історію ми перетворилися на багатогалузевий університет 
              з понад 15 000 студентів і 950 викладачів.
            </Typography>
            <Typography variant="body2" className="university-section-text">
              Сьогодні ми працюємо над інноваційними проєктами разом із провідними 
              українськими та міжнародними партнерами.
            </Typography>
          </Grid>

          {/* 2. Факультети та інститути */}
          <Grid item xs={12} sm={6} className="university-section">
            <Typography variant="h5" className="university-section-title" gutterBottom>
              Факультети та інститути
            </Typography>
            <Typography variant="body2" className="university-section-text" paragraph>
              У складі УДУНТ:
            </Typography>
            <ul className="university-faculty-list">
              <li>Інженерно-механічний інститут</li>
              <li>Інститут інформаційних технологій</li>
              <li>Інститут хімії та біоінженерії</li>
              <li>Економічний факультет</li>
              <li>Юридичний факультет</li>
              <li>Факультет міжнародних відносин</li>
            </ul>
            <Typography variant="body2" className="university-section-text">
              Кожен підрозділ має сучасні лабораторії, аудиторії та програми стажувань.
            </Typography>
          </Grid>

          {/* 3. Наукові досягнення */}
          <Grid item xs={12} sm={6} className="university-section">
            <Typography variant="h5" className="university-section-title" gutterBottom>
              Наукові досягнення
            </Typography>
            <Typography variant="body2" className="university-section-text" paragraph>
              Ми займаємо провідні позиції в рейтингах:
            </Typography>
            <ul className="university-bullet-list">
              <li>Топ-5 у Scopus серед ЗВО Дніпра (2023)</li>
              <li>Топ-15 серед усіх ЗВО України за ефективністю участі у конкурсі</li>
              <li>Понад 2000 публікацій за останні 5 років</li>
              <li>Участь у програмах Horizon та Erasmus+</li>
            </ul>
            <Typography variant="body2" className="university-section-text">
              Наші студенти та викладачі регулярно отримують гранти та нагороди.
            </Typography>
          </Grid>

          {/* 4. Кампус та студентське життя */}
          <Grid item xs={12} sm={6} className="university-section">
            <Typography variant="h5" className="university-section-title" gutterBottom>
              Кампус та студентське життя
            </Typography>
            <Typography variant="body2" className="university-section-text" paragraph>
              Кампус УДУНТ включає:
            </Typography>
            <ul className="university-faculty-list">
              <li>21 гуртожиток із 100 % забезпеченням</li>
              <li>2 спорткомплекси (4 зали) та 3 басейни</li>
              <li>Легкоатлетичний манеж, футбольні поля</li>
              <li>Ботанічний сад і геологічний полігон</li>
            </ul>
            <Typography variant="body2" className="university-section-text">
              Студентський клуб, Палац культури, заходи та гуртки підтримують активне життя.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
