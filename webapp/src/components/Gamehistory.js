import React, { useState, useEffect } from 'react';
import { Container, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material';


const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const Gamehistory = () => {
  // Datos ficticios
  const gameData = [
    { id: 1, gamesPlayed: 10, questionsAnswered: 100, correctAnswers: 80, wrongAnswers: 20, accuracyRatio: '80%', totalTimePlayed: '5 horas' },
    { id: 2, gamesPlayed: 15, questionsAnswered: 150, correctAnswers: 120, wrongAnswers: 30, accuracyRatio: '80%', totalTimePlayed: '7 horas' },
    { id: 3, gamesPlayed: 20, questionsAnswered: 200, correctAnswers: 160, wrongAnswers: 40, accuracyRatio: '80%', totalTimePlayed: '9 horas' },
  ];

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
            {gameData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.gamesPlayed}</TableCell>
                <TableCell>{data.questionsAnswered}</TableCell>
                <TableCell>{data.correctAnswers}</TableCell>
                <TableCell>{data.wrongAnswers}</TableCell>
                <TableCell>{data.accuracyRatio}</TableCell>
                <TableCell>{data.totalTimePlayed}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default Gamehistory;