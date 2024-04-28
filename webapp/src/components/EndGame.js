import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Button, Snackbar} from '@mui/material';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import '../App.css';
import { CustomContainer } from '../CustomContainer';
import { useTranslation } from 'react-i18next';


const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const EndGame = () => {

  const { usernameGlobal } = useUser();
  const navigate = useNavigate();
  const [endGame, setEndGame] = useState('');
  const [error, setError] = useState('');

  const [t] = useTranslation("global");


  const getEndGame = useCallback(async () => {
    try {
        const response = await axios.get(`${apiEndpoint}/endgamestats`,{
        params: {
          username: usernameGlobal
        }
      });
      setEndGame(response.data);
    } catch (error) {
      setError(error.message);
    }
  }, [usernameGlobal])

  function volverInicio() {
    navigate("/PantallaInicio");
  }

  useEffect(() => {
    getEndGame();
  }, [getEndGame]);

  const selectImage = () => {

    if (endGame.endgameImageWithRatio >= 0 && endGame.endgameImageWithRatio < 25) {
      return require('./images/brain-angry.png');
    } else if (endGame.endgameImageWithRatio >= 25 && endGame.endgameImageWithRatio < 50) {
      return require('./images/brain-strong.png');
    } else {
      return require('./images/brain-strong2.png');
    }
  };

  return (
    <CustomContainer>
    <Box border={2} borderColor="black" p={3} borderRadius={8} bgcolor="#EE6D72" width="30%" maxWidth={800} height="auto" maxHeight="600px" display="flex" flexDirection="column" alignItems="center">
        <img src={selectImage()} alt="End Game" style={{ width: '50%', height: '50%', marginBottom: '16px', borderRadius: '8px' }} />    
        <Typography variant="h5" align="center" gutterBottom style={{ color: 'white', fontWeight: 'bold', marginBottom: '16px' }}>
          {t("textoEstadisticas")}
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} textAlign="center">
            <Typography variant="body1" style={{ color: 'white', fontWeight: 'bold' }}>
              {t("correctas")} {endGame.totalRightQuestions}
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="body1" style={{ color: 'white', fontWeight: 'bold' }}>
              {t("incorrectas")} {endGame.totalIncorrectQuestions}
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="body1" style={{ color: 'white', fontWeight: 'bold' }}>
              {t("ratio")} {endGame.ratio}
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="body1" style={{ color: 'white', fontWeight: 'bold' }}>
              {t("tiempoTotal")} {endGame.totalTime} 
            </Typography>
          </Grid>
        </Grid>
        <Box mt={3} textAlign="center">
          <Button variant="contained" color="primary" align="center" style={{ marginTop: 4, backgroundColor: '#f8b6bc',  color: '#413C3C',  fontWeight: 'bold',  transition: 'transform 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f8b6bc',
                  transform: 'scale(1.1)'
                }}} onClick={volverInicio}>
            <HomeIcon style={{ marginRight: '8px' }} /> {t("botonResumen")}
          </Button>
        </Box>
      </Box>
      <div>
        {error && (
          <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
        )}
      </div>
    </CustomContainer> 
  );
};

export default EndGame;