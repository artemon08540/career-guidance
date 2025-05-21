import React, { useEffect, useState } from 'react';
import { Box, Button, Slider, Typography } from '@mui/material';

interface Question {
  id: number;
  text: string;
  order: number;
}

interface Category {
  id: number;
  name: string;
  vector: number[];
}

const TestPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [results, setResults] = useState<{ name: string; similarity: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestionsAndVectors = async () => {
      try {
        const [questionRes, vectorRes] = await Promise.all([
          fetch('http://localhost:1337/api/questions'),
          fetch('http://localhost:1337/api/category-vector-entries?populate[category]=true&populate[question]=true'),
        ]);

        const questionData = await questionRes.json();
        const vectorData = await vectorRes.json();

        const loadedQuestions = questionData.data.map((item: any) => ({
          id: item.id,
          text: item.attributes.text,
          order: item.attributes.order,
        }));

        loadedQuestions.sort((a, b) => a.order - b.order);

        const categoryMap: Record<number, Category> = {};

        for (const item of vectorData.data) {
          const { category, question, value } = item.attributes;
          const catId = category.data.id;
          const catName = category.data.attributes.name;
          const questionOrder = question.data.attributes.order;

          if (!categoryMap[catId]) {
            categoryMap[catId] = { id: catId, name: catName, vector: [] };
          }

          categoryMap[catId].vector[questionOrder - 1] = value; // assuming order starts from 1
        }

        setQuestions(loadedQuestions);
        setAnswers(Array(loadedQuestions.length).fill(3));
        setCategories(Object.values(categoryMap));
        setLoading(false);
      } catch (error) {
        console.error('Помилка при завантаженні:', error);
      }
    };

    fetchQuestionsAndVectors();
  }, []);

  const handleAnswerChange = (index: number, value: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const cosineSimilarity = (vecA: number[], vecB: number[]) => {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return magA && magB ? dotProduct / (magA * magB) : 0;
  };

  const finishTest = () => {
    const results = categories.map((cat) => {
      const sim = cosineSimilarity(answers, cat.vector);
      return { name: cat.name, similarity: sim };
    });

    results.sort((a, b) => b.similarity - a.similarity);

    setResults(results.slice(0, 3));
  };

  if (loading) {
    return <Typography>Завантаження тесту...</Typography>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>Пройдіть тест</Typography>

      {questions.map((question, index) => (
        <Box key={question.id} mb={4}>
          <Typography>{question.text}</Typography>
          <Slider
            value={answers[index]}
            min={1}
            max={5}
            step={1}
            marks
            onChange={(e, value) => handleAnswerChange(index, value as number)}
          />
        </Box>
      ))}

      <Button variant="contained" onClick={finishTest}>Завершити тест</Button>

      {results.length > 0 && (
        <Box mt={5}>
          <Typography variant="h5">Ваші результати:</Typography>
          {results.map((r, i) => (
            <Typography key={i}>
              {i + 1}) {r.name} — {(r.similarity * 100).toFixed(2)}%
            </Typography>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default TestPage;
