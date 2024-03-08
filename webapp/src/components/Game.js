import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import { Container, Typography, Button, Snackbar } from '@mui/material';

const apiEndpoint = 'http://localhost:8003';

const Game = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState("");
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [elapsedTime,setElapsedTime] = useState(30);

  useEffect(() => {
    getQuestion();
  }, []);

  useEffect(() => {

    const timerId = setTimeout(()=>{
      setElapsedTime(time => time - 1);
    },1000);

    if(elapsedTime<=0){
        timeUp();
    }

    return () => {
      clearTimeout(timerId);
    }
  }, [elapsedTime]);

 function timeUp(){
    alert("Time up");
    getQuestion();
  }

  const getQuestion = async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/generateQuestion`, { });
      setQuestion(response.data.responseQuestion);
      setOptions(response.data.responseOptions);
      setCorrectOption(response.data.responseCorrectOption);
      setOpenSnackbar(true);
      setElapsedTime(30);
    } catch (error) {
      setError(error.response.data.error);
    }
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setOpenSnackbar(true);
    if(correctOption === option) {
      alert("Correcta");
      getQuestion();
    }
    else 
      getQuestion();
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      <LinearProgress variant="determinate" value={(elapsedTime)} /> {/* Barra de progreso */}
      <Typography variant="body1" sx={{ textAlign: 'center' }}>
        Tiempo restante: {elapsedTime} segundos
      </Typography>
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

export default Game;