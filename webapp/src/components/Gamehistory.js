import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useUser } from './UserContext';
import { Container, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Snackbar } from '@mui/material';
import '../App.css';
import { useTranslation } from 'react-i18next';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const Gamehistory = () => {

  const [t] = useTranslation("");

  const { usernameGlobal } = useUser();
  const [gamehistory, setGameHistory] = useState('');
  const [error, setError] = useState('');

  const getGameHistory = useCallback(async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/gamehistory`,{
        params: {
          username: usernameGlobal
        }
      });
      setGameHistory(response.data);
    } catch (error) {
      setError(error.response.data.error);
    }
  }, [usernameGlobal])

  useEffect(() => {
    getGameHistory();
  }, [getGameHistory]);

  return (
    <Container component="main" maxWidth="xxl"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh', 
        width: '100%', 
      }}>
      <Typography component="h1" variant="h5" align="center" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
        {t("textoHistorico")}
      </Typography>
      <TableContainer component={Paper} sx={{ maxWidth: '80%', marginBottom: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
                <TableCell align="center"><strong>{t("textoPartJug")}</strong></TableCell>
                <TableCell align="center"><strong>{t("textoPregResp")}</strong></TableCell>
                <TableCell align="center"><strong>{t("textoAciertos")}</strong></TableCell>
                <TableCell align="center"><strong>{t("textoFallos")}</strong></TableCell>
                <TableCell align="center"><strong>{t("textoRatAc")}</strong></TableCell>
                <TableCell align="center"><strong>{t("textoTiempo")}</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow>
                <TableCell align="center">{gamehistory.totalGamesPlayed}</TableCell>
                <TableCell align="center">{gamehistory.totalQuestionsAnswered}</TableCell>
                <TableCell align="center">{gamehistory.totalRightQuestions}</TableCell>
                <TableCell align="center">{gamehistory.totalIncorrectQuestions}</TableCell>
                <TableCell align="center">{gamehistory.ratio}</TableCell>
                <TableCell align="center">{gamehistory.totalTime}</TableCell>
              </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        {error && (
          <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
        )}
      </div>
    </Container>
  );
};

export default Gamehistory;