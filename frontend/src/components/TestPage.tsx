// src/components/TestPage.tsx
import React, { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Slider,
  Button,
  Paper,
} from '@mui/material'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

interface Question {
  id: number
  text: string
  order: number
}
interface Category {
  id: number
  name: string
  vector: number[]
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337'

const TestPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [answers, setAnswers] = useState<number[]>([])
  const [results, setResults] = useState<{ name: string; score: number }[] | null>(null)
  const [loading, setLoading] = useState(true)

  // 1. Завантажуємо всі питання
  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true)
      try {
        const res = await fetch(`${API_URL}/api/questions?sort=order:asc`)
        if (!res.ok) {
          console.error('❌ QUESTIONS fetch failed:', res.status, await res.text())
          setLoading(false)
          return
        }
        const json = await res.json()
        const items = Array.isArray(json.data) ? json.data : []
        const loaded: Question[] = items.map((q: any) => {
          const attrs = q.attributes ?? q
          return {
            id: q.id,
            text: attrs.text ?? '(без тексту)',
            order: attrs.order ?? 0,
          }
        })
        loaded.sort((a, b) => a.order - b.order)
        setQuestions(loaded)
        setAnswers(Array(loaded.length).fill(3)) // початкове значення слайдерів
      } catch (err) {
        console.error('❌ Помилка завантаження питань:', err)
      } finally {
        setLoading(false)
      }
    }
    loadQuestions()
  }, [])

  // 2. Обробник зміни слайдера
  const handleAnswerChange = (index: number, value: number) => {
    const updated = [...answers]
    updated[index] = value
    setAnswers(updated)
  }

  // 3. Обробник “Submit”
const handleSubmit = async () => {
  const ansArray = [...answers]
  const jwt = localStorage.getItem('jwt')

  if (jwt) {
    // дістаємо userId із localStorage
    const stored = localStorage.getItem('user')
    const parsed = stored ? JSON.parse(stored) : null
    const userId = parsed?.id

    if (!userId) {
      console.error('Не знайдено user у localStorage')
      return
    }

    // Формуємо тіло ExpertAnswer з підключенням до user
    const postBody = {
      data: {
        answers: ansArray,
        isConfirmed: false,
        user: {
          connect: userId,
        },
      },
    }

    try {
      const response = await fetch(`${API_URL}/api/expert-answers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${jwt}`,
        },
        body: JSON.stringify(postBody),
      })
      if (!response.ok) {
        const text = await response.text()
        console.error('❌ ExpertAnswer failed:', response.status, text)
        return
      }
      alert('✅ ExpertAnswer успішно збережено')
    } catch (err) {
      console.error('❌ Помилка відправки ExpertAnswer:', err)
    }
    return
  }

    // ГОСТЬ (JWT нема) → лише розрахунок cosine
    try {
      const res = await fetch(`${API_URL}/api/categories?fields=name,vector`)
      if (!res.ok) {
        console.error('❌ CATEGORIES fetch failed:', res.status, await res.text())
        return
      }
      const catsRaw = await res.json()
      const cats: Category[] = Array.isArray(catsRaw.data)
        ? catsRaw.data.map((c: any) => {
            const attrs = c.attributes ?? c
            return {
              id: c.id,
              name: attrs.name,
              vector: attrs.vector ?? [],
            }
          })
        : []
      const cosine = (a: number[], b: number[]) => {
        let dot = 0,
          na = 0,
          nb = 0
        const len = Math.min(a.length, b.length)
        for (let i = 0; i < len; i++) {
          dot += a[i] * b[i]
          na += a[i] ** 2
          nb += b[i] ** 2
        }
        return na && nb ? dot / Math.sqrt(na * nb) : 0
      }
      const scored = cats.map((c) => {
        let score = 0
        if (Array.isArray(c.vector) && c.vector.length === ansArray.length) {
          score = cosine(ansArray, c.vector)
        }
        return { name: c.name, score }
      })
      setResults(scored)
    } catch (err) {
      console.error('❌ Помилка обчислення результатів:', err)
    }
  }

  // Якщо ще завантажуємо питання
  if (loading) {
    return <Typography>Завантаження тесту…</Typography>
  }
  // Якщо питань немає
  if (!loading && questions.length === 0) {
    return (
      <Typography color="error">
        Питань не знайдено. Перевірте CMS та права Public → find/findOne.
      </Typography>
    )
  }

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Test Page
      </Typography>

      {questions.map((q, idx) => (
        <Box key={q.id} mb={4}>
          <Typography gutterBottom>
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

      <Button variant="contained" onClick={handleSubmit}>
        Завершити тест
      </Button>

      {results && (
        <Paper sx={{ mt: 4, p: 2 }}>
          <Typography variant="h6">Результати (cosine):</Typography>
          <Bar
            data={{
              labels: results.map((r) => r.name),
              datasets: [
                {
                  label: 'Score',
                  data: results.map((r) => r.score),
                  backgroundColor: 'rgba(25, 118, 210, 0.5)',
                },
              ],
            }}
            options={{
              scales: {
                y: {
                  min: 0,
                  max: 1,
                  ticks: { stepSize: 0.1 },
                },
              },
            }}
          />
        </Paper>
      )}
    </Box>
  )
}

export default TestPage
