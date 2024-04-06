import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import { Container, Typography, Button, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const Game = () => {
  const { usernameGlobal } = useUser();
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState('');
  const [options, setOptions] = useState([]);
  const [correctOption, setCorrectOption] = useState("");
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [elapsedTime,setElapsedTime] = useState(30);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [answeredQuestions,setAnsweredQuestions] = useState(0);
  const [isTimeRunning, setIsTimeRunning] = useState(true);

  // Comentario de prueba para el despliegue
  const MAX_TIME = 30;
  const MAX_PREGUNTAS = 5;
  const navigate = useNavigate();

  const getQuestion = useCallback(async () => {
    try {

      const response = await axios.get(`${apiEndpoint}/generateQuestion`, {
        params: {
          user: usernameGlobal
        }
      });
      setQuestion(response.data.responseQuestion);
      setOptions(response.data.responseOptions);
      setCorrectOption(response.data.responseCorrectOption);
      setImage(response.data.responseImage);
      setOpenSnackbar(true);
      setIsTimeRunning(true);
      setElapsedTime(MAX_TIME);
      setAnsweredQuestions(prevValue => prevValue+1);
    } catch (error) {
      console.log(error.message);
      setError(error.response.data.error);
    }
  }, [usernameGlobal])

  useEffect(() => {
    getQuestion();
  }, [getQuestion]);

  useEffect(() => {

    const timerId = setTimeout(()=>{
      if (isTimeRunning) {
        setElapsedTime(time => time - 1);
      }
    },1000);

    if(elapsedTime<=0){
      setIsTimeRunning(false);
      if (answeredQuestions >= MAX_PREGUNTAS) {
        setAnsweredQuestions(0);
        navigate("/PantallaInicio");
      }else{
        getQuestion(answeredQuestions+1);
      }
    }

    return () => {
      clearTimeout(timerId);
    }
  }, [elapsedTime, getQuestion, answeredQuestions, navigate,  isTimeRunning]);

  const handleOptionClick = async (option) => {
    var isTheCorrectAnswer = false;
    setSelectedOption(option);
    setOpenSnackbar(true);
    console.log(openSnackbar);
    setAnswerCorrect(correctOption === option);
    setIsTimeRunning(false);

    if(correctOption === option){
      isTheCorrectAnswer = true;
    }

    try {
      const timePassed = MAX_TIME - elapsedTime;
      await axios.get(`${apiEndpoint}/updateQuestion`, {
        params: {
          time: timePassed,
          correct: isTheCorrectAnswer
        }
      });
    } catch (error) {
      setError(error.response.data.error);
    }


    if (answeredQuestions>= MAX_PREGUNTAS) {
      setTimeout(() => {
        setAnsweredQuestions(0);
        navigate("/PantallaInicio");
      }, 3000);
    }else{
      setTimeout(() => {
        getQuestion(answeredQuestions+1);
      }, 900);
    }
  };


  return (
    <Container component="main" maxWidth="xl"
            sx={{
                marginTop: 4,
                backgroundColor: '#F3D3FA',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '95vh' 
            }}>
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
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {image !== null && image !== "" && <img src={image} alt="Imagen de la pregunta" width="20%" height="auto"/>}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', alignItems: 'center', marginTop: '20px' }}>
        {options.map((option, index) => (
          <Button key={index} sx={{backgroundColor: selectedOption === option ? (answerCorrect ? '#00C853' : '#FF1744') : '#FCF5B8',  color: '#413C3C',  fontWeight: 'bold' }} variant="contained" onClick={!isTimeRunning ? null : () => handleOptionClick(option)} style={{ width: '100%', height: '100%' }}>
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