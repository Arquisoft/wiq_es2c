import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Box, Typography, Grid, Button, Snackbar} from '@mui/material';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import '../App.css';
import { CustomContainer } from '../CustomContainer';


const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const EndGame = () => {

  const { usernameGlobal } = useUser();
  const navigate = useNavigate();
  const [endGame, setEndGame] = useState('');
  const [error, setError] = useState('');

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
      return require('./images/ronnie-muletas.png');
    } else if (endGame.endgameImageWithRatio >= 25 && endGame.endgameImageWithRatio < 50) {
      return require('./images/ronnie-comiendo.png');
    } else {
      return require('./images/ronnie.gif');
    }
  };

  return (
    <CustomContainer>
    <Box border={2} borderColor="black" p={3} borderRadius={8} bgcolor="#9A77B0" width="30%" maxWidth={800} height="auto" maxHeight="600px">
        <img src={selectImage()} alt="End Game" style={{ width: '100%', marginBottom: '16px', borderRadius: '8px' }} />    
        <Typography variant="h5" align="center" gutterBottom style={{ color: 'white', fontWeight: 'bold', marginBottom: '16px' }}>
          Estadísticas de la última partida
        </Typography>
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} textAlign="center">
            <Typography variant="body1" style={{ color: 'white', fontWeight: 'bold' }}>
              Preguntas correctas: {endGame.totalRightQuestions}
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="body1" style={{ color: 'white', fontWeight: 'bold' }}>
              Preguntas incorrectas: {endGame.totalIncorrectQuestions}
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="body1" style={{ color: 'white', fontWeight: 'bold' }}>
              Ratio de aciertos: {endGame.ratio}
            </Typography>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography variant="body1" style={{ color: 'white', fontWeight: 'bold' }}>
              Tiempo total: {endGame.totalTime} 
            </Typography>
          </Grid>
        </Grid>
        <Box mt={3} textAlign="center">
          <Button variant="contained" color="primary" align="center" style={{ marginTop: 4, backgroundColor: '#FCF5B8', color: '#413C3C', fontWeight: 'bold'}} onClick={volverInicio}>
            <HomeIcon style={{ marginRight: '8px' }} /> Volver al inicio
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