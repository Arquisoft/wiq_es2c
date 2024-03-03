import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import { Container, Typography, Button, Snackbar } from '@mui/material';
import Question from "../clases/Question";

// Las líneas comentadas son de las pruebas para llamar al microservicio del generador de preguntas

const apiEndpoint = 'http://localhost:8003';

const Game = () => {
  const [questionClass, setQuestionClass] = useState(new Question());
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState("");
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alreadyExecuted, setAlreadyExecuted] = useState(false);

  useEffect(() => {
    getQuestion();
  }, []);

  const getQuestion = async () => {
    try {
      //const response = await axios.get(`${apiEndpoint}/question`);
      await questionClass.generarPregunta();
      setQuestion(questionClass.question);
      setOptions(questionClass.options);
      setCorrectOption(questionClass.correctOption);
    } catch (error) {
      setError('Error fetching question');
    }
  };

  // const getQuestion = async () => {
  //   try {
  //     if(!alreadyExecuted) {
  //       const response = await axios.post(`${apiEndpoint}/generateQuestion`, { });
  //       setQuestion(response.data.responseQuestion);
  //       setOptions(response.data.responseOptions);
  //       setCorrectOption(response.data.responseCorrectOption);
  //       setOpenSnackbar(true);
  //       setAlreadyExecuted(true);
  //     }
  //   } catch (error) {
  //     setError(error.response.data.error);
  //   }
  // }

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setOpenSnackbar(true);
    if(correctOption === option)
      alert("Correcta");
    else 
      alert("Incorrecta");
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

export default Game;