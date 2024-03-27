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
  const [questionId,setQuestionId] = useState(null);
  const [error, setError] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [elapsedTime,setElapsedTime] = useState(30);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [answeredQuestions,setAnsweredQuestions] = useState(1);

  const MAX_TIME = 30;
  const MAX_PREGUNTAS = 5;

  const navigate = useNavigate();

  const getQuestion = useCallback(async (answeredQuestionsValue) => {
    try {
      //console.log(" NUMERO DE PREGUNTA " + answeredQuestionsValue);

      const createNewGame = answeredQuestionsValue > 0 ? false : true;

      //console.log(" HAY QUE CREAR UN NUEVO JUEGO? " + createNewGame);

      const response = await axios.get(`${apiEndpoint}/generateQuestion`, {
          params: {
              user: usernameGlobal,
              newGame: createNewGame,
              numberOfQuestiona: answeredQuestionsValue
          }
      });
      setQuestionId(response.data.question_Id);
      setQuestion(response.data.responseQuestion);
      setOptions(response.data.responseOptions);
      setCorrectOption(response.data.responseCorrectOption);
      setImage(response.data.responseImage);
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
      getQuestion(answeredQuestions+1);
      setAnsweredQuestions(answeredQuestions+1);
      if (answeredQuestions+1 >= MAX_PREGUNTAS) {
        setAnsweredQuestions(0);
        navigate("/PantallaInicio");
      }
    }

    return () => {
      clearTimeout(timerId);
    }
  }, [elapsedTime, getQuestion]);

  const handleOptionClick = async (option) => {
    setSelectedOption(option);
    setOpenSnackbar(true);
    console.log(openSnackbar);
    setAnswerCorrect(correctOption === option);

    try {
      const timePassed = MAX_TIME - elapsedTime;
      const response = await axios.get(`${apiEndpoint}/updateQuestion`, {
        params: {
          question_Id: questionId,
          time: timePassed
        }
      });
    } catch (error) {
      setError(error.response.data.error);
    }

    setTimeout(() => {
      getQuestion(answeredQuestions+1);
    }, 1500);

    setAnsweredQuestions(answeredQuestions+1);
    if (answeredQuestions+1>= MAX_PREGUNTAS) {
      setTimeout(() => {
        setAnsweredQuestions(0);
        navigate("/PantallaInicio");
      }, 3000);

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
      <div>
        {image != null && image != "" && <img src={image} alt="Imagen de la pregunta" width="40%" height="auto"/>}
      </div>
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