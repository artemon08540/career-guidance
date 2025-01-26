import React, { useState } from 'react';
import { Modal, Box, Typography, TextField, Button } from '@mui/material';

const LoginModal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button color="inherit" onClick={() => setOpen(true)}>Увійти</Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6" mb={2}>
            Ласкаво просимо!
          </Typography>
          <TextField label="Логін" fullWidth margin="normal" />
          <TextField label="Пароль" fullWidth margin="normal" type="password" />
          <Button variant="contained" color="primary" fullWidth>
            Увійти
          </Button>
        </Box>
      </Modal>
    </>
  );
};

export default LoginModal;
