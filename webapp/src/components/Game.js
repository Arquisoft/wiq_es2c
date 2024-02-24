import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Button, Snackbar } from '@mui/material';

const PreguntaPage = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    getQuestion;
  }, []);

  const getQuestion = async () => {
    try {
      const response = await axios.get('http://localhost:8000/question');
      setQuestion(response.data.question);
      setOptions(response.data.options);
    } catch (error) {
      setError('Error fetching question');
    }
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
        {question}
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
        {options.map((option, index) => (
          <Button key={index} variant="contained" color="primary" onClick={() => handleOptionClick(option)}>
            {option}
          </Button>
        ))}
      </div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={`Option ${selectedOption} selected`} />
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
      )}
    </Container>
  );
};

export default PreguntaPage;