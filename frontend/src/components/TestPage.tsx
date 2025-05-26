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

        const loadedQuestions = data.data.map((item: any) => ({
          id: item.id,
          text: item.text,
          order: item.order,
        }));

        loadedQuestions.sort((a, b) => a.order - b.order);

        setQuestions(loadedQuestions);
        setAnswers(Array(loadedQuestions.length).fill(3));
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

  const cosineSimilarity = (vecA: number[], vecB: number[]) => {
    const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
    const magA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
    const magB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
    return dotProduct / (magA * magB);
  };

  const finishTest = async () => {
    try {
      const token = localStorage.getItem('jwt');

      if (!token) {
        const response = await fetch('http://localhost:1337/api/categories');
        const data = await response.json();

        const categories = data.data.map((item: any) => ({
          id: item.id,
          name: item.name,
          vector: item.vector,
        }));

        let maxSimilarity = -1;
        let bestCategoryName = '';

        for (const category of categories) {
          if (!Array.isArray(category.vector)) continue;
          if (category.vector.length !== answers.length) {
            console.warn(`❌ Категорія ${category.name} має некоректну довжину vector`);
            continue;
          }

          const similarity = cosineSimilarity(answers, category.vector);
          console.log(`✅ ${category.name} similarity =`, similarity);

          if (similarity > maxSimilarity) {
            maxSimilarity = similarity;
            bestCategoryName = category.name;
          }
        }

        if (bestCategoryName) {
          alert(`Результат тесту: Вам підходить категорія "${bestCategoryName}"!`);
        } else {
          alert('На жаль, не вдалося підібрати категорію. Можливо, немає валідних еталонних даних.');
        }
      } else {
        const user = localStorage.getItem('user');
        const parsedUser = user ? JSON.parse(user) : null;
        const userId = parsedUser?.id;

        if (!userId) {
          alert('Помилка: Не знайдено користувача для відповіді.');
          return;
        }

        const postResponse = await fetch('http://localhost:1337/api/expert-answers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              answers,
              user: {
                connect: [userId], // 🔥 саме ТАК очікує Strapi для manyToOne
              },
            },
          }),
        });

        if (postResponse.ok) {
          alert('Ваші відповіді успішно надіслані на перевірку адміністратору!');
        } else {
          const errorText = await postResponse.text();
          console.error('Помилка відповіді сервера:', errorText);
          alert('Помилка при надсиланні відповіді експерта: ' + errorText);
        }
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