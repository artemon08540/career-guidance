  // src/components/TestPage.tsx

  import React, { useState, useEffect } from 'react';
  import {
    Box,
    Typography,
    Slider,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Paper,
  } from '@mui/material';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  import ReactMarkdown from 'react-markdown';
  import remarkGfm from 'remark-gfm';
  import './TestPage.css';

  interface Question {
    id: number;
    text: string;
    order: number;
  }

  interface Category {
    id: number;
    name: string;
    vector: number[];
    shortDescription: string;
    fullDescription: string;
  }

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:1337';

  const TestPage: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [answers, setAnswers] = useState<number[]>([]);
    const [results, setResults] = useState<
      { name: string; score: number; short: string; full: string }[] | null
    >(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const loadQuestions = async () => {
        setLoading(true);
        try {
          const res = await fetch(`${API_URL}/api/questions?sort=order:asc`);
          if (!res.ok) {
            console.error('❌ QUESTIONS fetch failed:', res.status, await res.text());
            setLoading(false);
            return;
          }
          const json = await res.json();
          const items = Array.isArray(json.data) ? json.data : [];
          const loaded: Question[] = items.map((q: any) => {
            const attrs = q.attributes ?? q;
            return {
              id: q.id,
              text: attrs.text ?? '(без тексту)',
              order: attrs.order ?? 0,
            };
          });
          loaded.sort((a, b) => a.order - b.order);
          setQuestions(loaded);
          setAnswers(Array(loaded.length).fill(3)); // початкові значення «3» (середній рівень)
        } catch (err) {
          console.error('❌ Помилка завантаження питань:', err);
        } finally {
          setLoading(false);
        }
      };
      loadQuestions();
    }, []);

    const handleAnswerChange = (index: number, value: number) => {
      const updated = [...answers];
      updated[index] = value;
      setAnswers(updated);
    };

    const handleSubmit = async () => {
      const ansArray = [...answers];
      const jwt = localStorage.getItem('jwt');

      // якщо є JWT → зберігаємо результат у колекцію ExpertAnswer
      if (jwt) {
        const stored = localStorage.getItem('user');
        const parsed = stored ? JSON.parse(stored) : null;
        const userId = parsed?.id;
        if (!userId) {
          console.error('Не знайдено user у localStorage');
          return;
        }
        const postBody = {
          data: {
            answers: ansArray,
            isConfirmed: false,
            user: { connect: userId },
          },
        };
        try {
          const response = await fetch(`${API_URL}/api/expert-answers`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${jwt}`,
            },
            body: JSON.stringify(postBody),
          });
          if (!response.ok) {
            const text = await response.text();
            console.error('❌ ExpertAnswer failed:', response.status, text);
            return;
          }
          alert('✅ Результат тесту успішно збережено');
        } catch (err) {
          console.error('❌ Помилка відправки ExpertAnswer:', err);
        }
        return;
      }

      // якщо користувач не авторизований → рахуємо топ-3 спеціальності по вектору
      try {
        const res = await fetch(
          `${API_URL}/api/categories?fields=name,vector,shortDescription,fullDescription&pagination[pageSize]=100`
        );
        if (!res.ok) {
          console.error('❌ CATEGORIES fetch failed:', res.status, await res.text());
          return;
        }
        const catsRaw = await res.json();
        const cats: Category[] = Array.isArray(catsRaw.data)
          ? catsRaw.data.map((c: any) => {
              const attrs = c.attributes ?? c;
              // Strapi інколи повертає fullDescription із рядками "\n\n" → замінимо на справжні переводи рядків
              const rawFull = attrs.fullDescription || '';
              const convertedFull = rawFull.replace(/\\n\\n/g, '\n\n');
              return {
                id: c.id,
                name: attrs.name,
                vector: attrs.vector ?? [],
                shortDescription: attrs.shortDescription ?? '',
                fullDescription: convertedFull,
              };
            })
          : [];

        // Функція для косинусної міри схожості
        const cosine = (a: number[], b: number[]) => {
          let dot = 0,
            na = 0,
            nb = 0;
          const len = Math.min(a.length, b.length);
          for (let i = 0; i < len; i++) {
            dot += a[i] * b[i];
            na += a[i] ** 2;
            nb += b[i] ** 2;
          }
          return na && nb ? dot / Math.sqrt(na * nb) : 0;
        };

        const scored = cats.map((c) => {
          let score = 0;
          if (Array.isArray(c.vector) && c.vector.length === ansArray.length) {
            score = cosine(ansArray, c.vector);
          }
          return {
            name: c.name,
            score,
            short: c.shortDescription,
            full: c.fullDescription,
          };
        });

        setResults(scored);
      } catch (err) {
        console.error('❌ Помилка обчислення результатів:', err);
      }
    };

    if (loading) {
      return (
        <Box className="testpage-loading">
          <Typography>Завантаження тесту…</Typography>
        </Box>
      );
    }

    if (!loading && questions.length === 0) {
      return (
        <Box className="testpage-no-questions">
          <Typography color="error">
            Питань не знайдено. Перевірте CMS та права Public → find/findOne.
          </Typography>
        </Box>
      );
    }

    return (
      <Box className="testpage-container">
        <Typography variant="h4" gutterBottom className="testpage-title">
          Визначся зі своєю майбутньою спеціальністю
        </Typography>

        <Box className="testpage-questions">
          {questions.map((q, idx) => (
            <Box key={q.id} className="testpage-question-block">
              <Typography className="testpage-question-text">
                {q.order}. {q.text}
              </Typography>
              <Slider
                value={answers[idx]}
                min={1}
                max={5}
                step={1}
                marks
                onChange={(_, value) => handleAnswerChange(idx, value as number)}
                valueLabelDisplay="auto"
              />
            </Box>
          ))}
        </Box>

        <Box className="testpage-submit-container">
          <Button variant="contained" onClick={handleSubmit} className="testpage-submit-button">
            Завершити тест
          </Button>
        </Box>

        {results && (
          <Box className="testpage-results-wrapper">
            <Paper className="testpage-results-paper" elevation={2}>
              <Typography variant="h6" className="testpage-results-title" gutterBottom>
                Топ-3 рекомендовані спеціальності
              </Typography>

              {results
                .slice()
                .sort((a, b) => b.score - a.score)
                .slice(0, 3)
                .map((r, index) => (
                  <Accordion key={r.name} className="testpage-accordion">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls={`res-${r.name}-content`}
                      id={`res-${r.name}-header`}
                    >
                      <Box className="testpage-accordion-header">
                        <Typography variant="subtitle1" className="testpage-accordion-title">
                          {`${index + 1}. ${r.name} — ${(r.score * 100).toFixed(1)}%`}
                        </Typography>
                        {r.short && (
                          <Typography variant="body1" className="testpage-accordion-short">
                            {r.short}
                          </Typography>
                        )}
                      </Box>
                    </AccordionSummary>

                    <AccordionDetails className="testpage-accordion-details">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                          p: ({ node, ...props }) => (
                            <Typography
                              component="p"
                              variant="body2"
                              className="testpage-full-text"
                              {...props}
                            />
                          ),
                          li: ({ node, ...props }) => (
                            <Typography
                              component="li"
                              variant="body2"
                              className="testpage-full-list-item"
                              {...props}
                            />
                          ),
                          h2: ({ node, ...props }) => (
                            <Typography
                              component="h2"
                              variant="subtitle2"
                              className="testpage-full-heading"
                              {...props}
                            />
                          ),
                        }}
                      >
                        {r.full}
                      </ReactMarkdown>
                    </AccordionDetails>
                  </Accordion>
                ))}
            </Paper>
          </Box>
        )}
      </Box>
    );
  };

  export default TestPage;
