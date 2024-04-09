import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Grid} from '@mui/material';
import HorizontalRuleIcon from '@mui/icons-material/HorizontalRule';
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
      <Grid container spacing={1} justifyContent="center">
      {/* Fila con una columna para el primero */}
      <Grid item xs={12} sm={12} md={4} textAlign="center">
        {ranking && (
          <Box>
            <img src={require('./images/medalla-de-oro.png')} alt="Primero" style={{ width: '50%', maxWidth: '100px', marginBottom: '5px' }} />
            <HorizontalRuleIcon style={{ color: 'black' }} />
            <Typography variant="h6" sx={{ marginTop: '5px' }}>{ranking.primero.userId} - {ranking.primero.ratio}%</Typography>
          </Box>
        )}
      </Grid>
      {/* Fila con dos columnas para el segundo y tercero */}
      <Grid item container xs={12} spacing={1} justifyContent="center">
        <Grid item xs={12} sm={6} md={4} textAlign="center">
          {ranking && (
            <Box>
              <img src={require('./images/medalla-de-plata.png')} alt="Segundo" style={{ width: '50%', maxWidth: '100px', marginBottom: '5px' }} />
              <HorizontalRuleIcon style={{ color: 'black' }} />
              <Typography variant="h6" sx={{ marginTop: '5px' }}>{ranking.segundo.userId} - {ranking.segundo.ratio}%</Typography>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} sm={6} md={4} textAlign="center">
          {ranking && (
            <Box>
              <img src={require('./images/medalla-de-bronce.png')} alt="Tercero" style={{ width: '50%', maxWidth: '100px', marginBottom: '5px' }} />
              <HorizontalRuleIcon style={{ color: 'black' }} />
              <Typography variant="h6" sx={{ marginTop: '5px' }}>{ranking.tercero.userId} - {ranking.tercero.ratio}%</Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Grid>
    </Container>
  );
};

export default Ranking;