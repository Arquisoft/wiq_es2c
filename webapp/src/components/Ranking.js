import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Box, Typography} from '@mui/material';
import { useUser } from './UserContext';
import '../App.css';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const Ranking = () => {

  const { usernameGlobal } = useUser();
  const [ranking, setRanking] = useState('');
  const [error, setError] = useState('');

  const getRanking = useCallback(async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/topUsers`);
      setRanking(response.data);
    } catch (error) {
      setError(error.response.data.error);
    }
  }, [usernameGlobal])

  useEffect(() => {
    getRanking();
  }, [getRanking]);

  return (
    <Container component="main" maxWidth="xl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
        width: '100%', 
      }}>
      {ranking && (
        <Box>
          <img src={require('./images/medalla-de-plata.png')} alt="Segundo" />
          <Typography>{ranking.segundo.ratio}%</Typography>
        </Box>
      )}
      {ranking && (
        <Box>
          <img src={require('./images/medalla-de-oro.png')} alt="Primero" />
          <Typography>{ranking.primero.ratio}%</Typography>
        </Box>
      )}
      {ranking && (
        <Box>
          <img src={require('./images/medalla-de-bronce.png')} alt="Tercero" />
          <Typography>{ranking.tercero.ratio}%</Typography>
        </Box>
      )}
    </Container>
  );
};

export default Ranking;