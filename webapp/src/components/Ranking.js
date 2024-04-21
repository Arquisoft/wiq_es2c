import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import {
  Container,
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { useUser } from './UserContext';
import '../App.css';
import { useTranslation } from 'react-i18next';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const Ranking = () => {

  const [t, i18n] = useTranslation("global");

  const { usernameGlobal } = useUser();
  const [ranking, setRanking] = useState('');
  const [error, setError] = useState('');
  const [rankingTable, setRankingTable] = useState([]);
  const [sortBy, setSortBy] = useState('ratio');
  const [userLimit, setUserLimit] = useState(10);

  const getRanking = useCallback(async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/topUsers`);
      setRanking(response.data);
    } catch (error) {
      setError(error.response.data.error);
    }
  }, [usernameGlobal])

  const getRankingGlobal = useCallback(async () => {
    try {
      const response = await axios.get(
        `${apiEndpoint}/ranking`, {
        params: {
          sortBy: sortBy,
          userLimit: userLimit
        }
      });
      setRankingTable(response.data);
    } catch (error) {
      setError(error.response.data.error);
    }
  }, [sortBy, userLimit]);

  useEffect(() => {
    getRanking();
    getRankingGlobal();
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

    <Box
        sx={{
          marginTop: '16px',
          width: '80%',
          maxWidth: 1200,
          borderRadius: 8,
          padding: 3,
          bgcolor: '#fff',
          border: '1px solid #ddd',
        }}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <InputLabel>Ordenar por</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <MenuItem value="ratio">Ratio</MenuItem>
                <MenuItem value="totalRightQuestions">Aciertos</MenuItem>
                <MenuItem value="totalQuestionsAnswered">Preguntas respondidas</MenuItem>
                <MenuItem value="totalGamesPlayed">Partidas jugadas</MenuItem>
                <MenuItem value="totalTime">Tiempo jugado</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                label="Número de usuarios"
                tipo="number"
                value={userLimit}
                onChange={(e) => setUserLimit(parseInt(e.target.value))}
                inputProps={{ min: 1, max: 10 }}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Usuario</TableCell>
              <TableCell>
                {sortBy === "ratio" ? "Ratio" :
                 sortBy === "totalQuestionsAnswered" ? "Preguntas respondidas" :
                 sortBy === "totalRightQuestions" ? "Aciertos" :
                 sortBy === "totalGamesPlayed" ? "Partidas jugadas" :
                 sortBy === "totalTime" ? "Tiempo total" : ""}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rankingTable.map((user, index) => (
              <TableRow key={index}>
                <TableCell>{user.userId}</TableCell>
                <TableCell>
                  {sortBy === "ratio" ? user.ratio :
                   sortBy === "totalQuestionsAnswered" ? user.totalQuestionsAnswered :
                   sortBy === "totalRightQuestions" ? user.totalRightQuestions :
                   sortBy === "totalGamesPlayed" ? user.totalGamesPlayed :
                   sortBy === "totalTime" ? user.totalTime : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
  </Container> 
  );
};

export default Ranking;