import { Typography, Box } from '@mui/material';

const ContentBlock = () => {
  return (
    <Box sx={{ pl: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold' }}>
        Заголовок на головній сторінці сайту
      </Typography>
      <Typography variant="body1" sx={{ lineHeight: 1.5, fontSize: '1rem' }}>
        Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст.
        Текст текст текст текст текст текст текст текст текст текст текст текст текст текст текст.
      </Typography>
    </Box>
  );
};

export default ContentBlock;
