import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import LinearProgress from '@mui/material/LinearProgress';
import { Container, Typography, Button, Snackbar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from './UserContext';
import '../App.css';
import { useTranslation } from 'react-i18next';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const Game = () => {
  
  const [t] = useTranslation("global");

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

  const location = useLocation();

  const MAX_TIME = location.state ? location.state.time : null;
  const MAX_PREGUNTAS = location.state ? location.state.question : null;
  const THEMATIC = location.state ? location.state.thematic : null;
  const navigate = useNavigate();

  const getQuestion = useCallback(async () => {
    try {      
      const response = await axios.get(`${apiEndpoint}/generateQuestion`, {
        params: {
          user: usernameGlobal,
          thematic: THEMATIC
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
      console.log("Error: " + error.response.data.error);
      setError(error.response.data.error);
    }
  }, [usernameGlobal, MAX_TIME, THEMATIC]);

  const saveGameHistory = useCallback(async () => {
    try {
      const username = usernameGlobal;
      await axios.post(`${apiEndpoint}/saveGameHistory`, {username});
    } catch (error) {
      setError(error.response.data.error);
    }
  }, [usernameGlobal]);

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
        setTimeout(() => {
          setAnsweredQuestions(0);
          saveGameHistory();
          navigate("/EndGame");
        }, 3000);
      }else{
        getQuestion();
      }
    }

    return () => {
      clearTimeout(timerId);
    }
  }, [elapsedTime, getQuestion, answeredQuestions, navigate,  isTimeRunning, saveGameHistory, MAX_PREGUNTAS]);

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
        saveGameHistory();
        navigate("/EndGame");
      }, 3000);
    }else{
      setTimeout(() => {
        getQuestion();
      }, 900);
    }
  };


  return (
    <Container component="main" maxWidth="xxl"
            sx={{
                backgroundColor: '#F3D3FA',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '100vh', 
                width: '100%', 
            }}>
      <Container component="section" maxWidth="xs">
        {question && (
          <>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              {answeredQuestions} / {MAX_PREGUNTAS}
            </Typography>
            <Typography variant="body1" sx={{ textAlign: 'center' }}>
              {t("textoTiempoRest")} {elapsedTime} {t("textoTiempoRest2")}
            </Typography>
            <LinearProgress variant="determinate" value={(elapsedTime / MAX_TIME) * 100 } sx={ {
              width: '80%',
              height: '1vh',
              margin: 'auto',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}/> {/* Barra de progreso */}
          </>
        )}
        <Typography component="h1" variant="h5" sx={{ textAlign: 'center' }}>
          {question}
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {image !== null && image !== "" && <img src={image} alt="Imagen de la pregunta" width="60%" height="auto"/>}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', alignItems: 'center', marginTop: '20px' }}>
          {options.map((option, index) => (
            <Button key={index } style={{ 
                width: '100%',
                height: '17vh',
                backgroundColor: selectedOption === option ? (answerCorrect ? '#00C853' : '#FF1744') : '#FCF5B8',
                color: '#413C3C', 
                fontWeight: 'bold'
              }} variant="contained" onClick={!isTimeRunning ? null : () => {handleOptionClick(option);}}>
              {option}
            </Button>
          ))}
        </div>
        <div>
          {error && (
            <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
          )}
        </div>
      </Container>
    </Container>
  );
};

export default Game;