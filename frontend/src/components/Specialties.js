// src/components/Specialties.jsx

import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import '../components/Specialties.css';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1337';

export default function Specialties() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/categories?pagination[pageSize]=100`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Помилка завантаження: ${res.status}`);
        }
        return res.json();
      })
      .then((json) => {
        console.log('Strapi categories response:', json);
        const items = Array.isArray(json.data) ? json.data : [];
        const loaded = items.map((item) => {
          const raw = item.fullDescription || '';
          // Замінюємо всі літеральні "\n" на справжні переноси рядка
          const converted = raw.replace(/\\n/g, '\n');
          return {
            id: item.id,
            name: item.name || '',
            shortDescription: item.shortDescription || '',
            fullDescription: converted
          };
        });
        setCategories(loaded);
      })
      .catch((e) => {
        console.error(e);
        setError(e.message || 'Невідома помилка');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box className="specialties-loader-container">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" className="specialties-error">
        {`Помилка при завантаженні спеціальностей: ${error}`}
      </Typography>
    );
  }

  if (categories.length === 0) {
    return (
      <Typography align="center" className="specialties-no-data">
        Спеціальностей не знайдено.
      </Typography>
    );
  }

  return (
    <Box component="section" className="specialties-root">
      {/* Заголовок */}
      <Typography
        variant="h4"
        gutterBottom
        align="center"
        className="specialties-title"
      >
        Спеціальності університету
      </Typography>

      {/* Підзаголовок */}
      <Typography
        variant="body1"
        paragraph  
        align="center"
        className="specialties-intro"  
      >
        Ознайомтеся з описами наших спеціальностей. Розкрийте будь-яку назву, щоб побачити докладний опис.
      </Typography>

      {/* Для кожної категорії – один Accordion */}
      {categories.map((cat) => (
        <Accordion key={cat.id} className="specialties-accordion">
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`cat-${cat.id}-content`}
            id={`cat-${cat.id}-header`}
          >
            <Box className="specialties-accordion-summary">
              <Typography
                variant="h6"
                className="specialties-accordion-title"
              >
                {cat.name}
              </Typography>
              {cat.shortDescription && (
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="specialties-short"
                >
                  {cat.shortDescription}
                </Typography>
              )}
            </Box>
          </AccordionSummary>

          <AccordionDetails className="specialties-details">
            <Box className="specialties-full">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {cat.fullDescription}
              </ReactMarkdown>
            </Box>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
}
