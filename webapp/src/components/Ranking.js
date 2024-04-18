import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Container, Box, Typography, Grid} from '@mui/material';
import { useUser } from './UserContext';
import '../App.css';
import { useTranslation } from 'react-i18next';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const Ranking = () => {

  const [t, i18n] = useTranslation("global");

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
    <Box border={2} borderColor="black" p={3} borderRadius={8} bgcolor="#9A77B0" width="30%" maxWidth={800} height="auto">
      <Typography variant="h5" align="center" gutterBottom style={{ color: 'white', fontWeight: 'bold', marginBottom: '16px' }}>
        {t("textoTop")}
      </Typography>
      <Grid container spacing={6} justifyContent="center"> 
        <Grid item xs={12} md={4} textAlign="center">
          {ranking && (
            <Box>
              <img src={require('./images/medalla-de-oro.png')} alt="Primero" style={{ width: '80%', maxWidth: '160px', marginBottom: '8px' }} />
              <Typography variant="h6" style={{ fontWeight: 'bold', color: 'white' }}>{ranking.primero}</Typography>
            </Box>
          )}
        </Grid>
        <Grid item container xs={12} spacing={2} justifyContent="center">
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            {ranking && (
              <Box>
                <img src={require('./images/medalla-de-plata.png')} alt="Segundo" style={{ width: '70%', maxWidth: '120px', marginBottom: '6px' }} /> 
                <Typography variant="h6" style={{ fontWeight: 'bold', color: 'white' }}>{ranking.segundo}</Typography>
              </Box>
            )}
          </Grid>
          <Grid item xs={12} sm={6} md={4} textAlign="center">
            {ranking && (
              <Box>
                <img src={require('./images/medalla-de-bronce.png')} alt="Tercero" style={{ width: '70%', maxWidth: '120px', marginBottom: '6px' }} /> 
                <Typography variant="h6" style={{ fontWeight: 'bold', color: 'white' }}>{ranking.tercero}</Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  </Container> 
  );
};

export default Ranking;