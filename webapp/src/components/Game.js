import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import { Container, Typography, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Cambio de prueba
const apiEndpoint = process.env.REACT_APP_API_GENERATOR_ENDPOINT || 'http://localhost:8003';

const Game = () => {
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState("");
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [elapsedTime,setElapsedTime] = useState(30);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [answeredQuestions,setAnsweredQuestions] = useState(0);

  const MAX_TIME = 30;
  const MAX_PREGUNTAS = 5;  

  const navigate = useNavigate();

  const getQuestion = useCallback(async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/generateQuestion`, { });
      setQuestion(response.data.responseQuestion);
      setOptions(response.data.responseOptions);
      setCorrectOption(response.data.responseCorrectOption);
      setOpenSnackbar(true);
      setElapsedTime(MAX_TIME);
    } catch (error) {
      setError(error.response.data.error);
    }
  }, [])

  useEffect(() => {
    getQuestion();
  }, [getQuestion]);

  useEffect(() => {

    const timerId = setTimeout(()=>{
      setElapsedTime(time => time - 1);
    },1000);

    if(elapsedTime<=0){
      getQuestion();
    }

    return () => {
      clearTimeout(timerId);
    }
  }, [elapsedTime, getQuestion]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setOpenSnackbar(true);
    console.log(openSnackbar);
    setAnswerCorrect(correctOption === option);
    setTimeout(() => {
      getQuestion();
    }, 1500);

    setAnsweredQuestions(answeredQuestions+1)

    if (answeredQuestions >= MAX_PREGUNTAS) {
      navigate("/PantallaInicio");
    }
  };

  return (
    <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
      {question && (
        <>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            {answeredQuestions} / {MAX_PREGUNTAS}
          </Typography>
          <Typography variant="body1" sx={{ textAlign: 'center' }}>
            Tiempo restante: {elapsedTime} segundos
          </Typography>
          <LinearProgress variant="determinate" value={(elapsedTime / MAX_TIME) * 100 } sx={{ height: '10px' }}/> {/* Barra de progreso */}
        </>
      )}
      <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
        {question}
      </Typography>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', alignItems: 'center', marginTop: '20px' }}>
        {options.map((option, index) => (
          <Button key={index} sx={{backgroundColor: '#FCF5B8',  color: '#413C3C',  fontWeight: 'bold' }} variant="contained" color={selectedOption === option ? (answerCorrect ? 'success' : 'error') : 'primary'} onClick={() => handleOptionClick(option)} style={{ width: '100%', height: '100%' }}>
            {option}
          </Button>
        ))}
      </div>
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
      )}
    </Container>
  );
};

export default Game;