import React, { useEffect, useState } from 'react';
import { Box, Button, Slider, Typography } from '@mui/material';

interface Question {
  id: number;
  text: string;
  order: number;
}

const TestPage: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('http://localhost:1337/api/questions');
        const data = await response.json();

        // Витягуємо реальні питання
        const loadedQuestions = data.data.map((item: any) => ({
          id: item.id,
          text: item.text,
          order: item.order,
        }));

        // Сортуємо за порядком (order)
        loadedQuestions.sort((a: Question, b: Question) => a.order - b.order);

        setQuestions(loadedQuestions);
        setAnswers(Array(loadedQuestions.length).fill(3)); // Початково всі відповіді 3
        setLoading(false);
      } catch (error) {
        console.error('Помилка при завантаженні питань:', error);
      }
    };

    fetchQuestions();
  }, []);

  const handleAnswerChange = (index: number, value: number) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = value;
    setAnswers(updatedAnswers);
  };

  const finishTest = async () => {
    try {
      const token = localStorage.getItem('jwt');
  
      if (!token) {
        // Користувач анонімний — рахуємо результат тесту
  
        // Завантажити категорії
        const response = await fetch('http://localhost:1337/api/categories');
        const data = await response.json();
  
        // Парсимо категорії
        const categories = data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          vector: item.vector,
        }));
  
        // Розрахунок косинусної схожості
        const cosineSimilarity = (vecA: number[], vecB: number[]) => {
          const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
          const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
          const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
          return dotProduct / (magA * magB);
        };
  
        let maxSimilarity = -1;
        let bestCategory = '';
  
        for (const category of categories) {
          if (!category.vector || !Array.isArray(category.vector)) continue;
          const similarity = cosineSimilarity(answers, category.vector);
          if (similarity > maxSimilarity) {
            maxSimilarity = similarity;
            bestCategory = category.name;
          }
        }
  
        alert(`Результат тесту: Вам підходить категорія "${bestCategory}"!`);
      } else {
        // Якщо буде час, тут ми реалізуємо надсилання відповідей експерта
        alert('Ви увійшли як експерт. Скоро буде реалізована відправка відповідей.');
      }
    } catch (error) {
      console.error('Помилка під час завершення тесту:', error);
      alert('Сталася помилка при завершенні тесту.');
    }
  };
  

  if (loading) {
    return <Typography>Завантаження тесту...</Typography>;
  }

  return (
    <Box p={3}>
      <Typography variant="h4" mb={3}>
        Пройдіть тест
      </Typography>

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

      <Button variant="contained" onClick={finishTest}>
        Завершити тест
      </Button>
    </Box>
  );
};

export default TestPage;
