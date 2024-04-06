import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import { Container, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';


const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const Gamehistory = () => {
  const { usernameGlobal } = useUser();
  const [gamehistory, setGameHistory] = useState('');

  const getGameHistory = (async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/gamehistory`, {username: usernameGlobal});
      setGameHistory(response);
    } catch (error) {
      setError(error.response.data.error);
    }
  }, [usernameGlobal])

  useEffect(() => {
    getGameHistory();
  }, [getGameHistory]);

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
      }}
    >
      <Typography component="h1" variant="h5" align="center" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
        MIS ESTADÍSTICAS
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: '80%', marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Partidas Jugadas</TableCell>
              <TableCell>Preguntas Respondidas</TableCell>
              <TableCell>Aciertos</TableCell>
              <TableCell>Fallos</TableCell>
              <TableCell>Ratio de Acierto</TableCell>
              <TableCell>Tiempo Jugado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow>
                <TableCell>{gamehistory.userId}</TableCell>
                <TableCell>{gamehistory.totalGamesPlayed}</TableCell>
                <TableCell>{gamehistory.totalRightQuestions}</TableCell>
                <TableCell>{gamehistory.totalIncorrectQuestions}</TableCell>
                <TableCell>{gamehistory.ratio}</TableCell>
                <TableCell>{gamehistory.totalTime}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Gamehistory;