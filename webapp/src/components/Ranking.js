import React, { useState, useEffect, useCallback}  from 'react';
import axios from 'axios';
import {
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
  Snackbar
} from '@mui/material';
import '../App.css';
import { useTranslation } from 'react-i18next';
import { CustomContainer } from '../CustomContainer';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const Ranking = () => {

  const [t] = useTranslation("global");

  const [ranking, setRanking] = useState('');
  const [error, setError] = useState('');
  const [rankingTable, setRankingTable] = useState([]);
  const [sortBy, setSortBy] = useState('ratio');
  const [userLimit, setUserLimit] = useState(10);
  const isMobile = window.innerWidth <= 768;

  const getRanking = useCallback(async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/topUsers`);
      setRanking(response.data);
    } catch (error) {
      setError(error.response.data.error);
    }
  }, []);

  const getRankingGlobal = useCallback(async () => {
    try {
      const response = await axios.get(`${apiEndpoint}/ranking`, {params: {sortBy, userLimit}});
      setRankingTable(response.data);
    } catch (error) {
      setError(error.response.data.error);
    }
  }, [sortBy, userLimit]);

  const handleSortByChange = async (event) => {
    const newSortBy = event.target.value;
    setSortBy(newSortBy);
    getRankingGlobal();
  };

  const handleLimit = async (event) => {
    let inputValue = parseInt(event.target.value);
    if (!isNaN(inputValue) && inputValue >= 0) {
        inputValue = Math.min(inputValue, 20);
        setUserLimit(inputValue);
        getRankingGlobal();
    }
  };

  useEffect(() => {
    getRanking();
    getRankingGlobal();
  }, [getRanking, getRankingGlobal]);

  const sortByLabels = {
    ratio: t("ratioRanking"),
    totalQuestionsAnswered: t("pregRespRanking"),
    totalRightQuestions: t("aciertosRanking"),
    totalGamesPlayed: t("partJugRanking"),
    totalTime: t("tiempoJugadoRanking"),
  };

  return (
    <CustomContainer>
      <Box border={2} borderColor="black" p={3} borderRadius={8} bgcolor="#EE6D72" mb={5} 
        style={{
          marginTop: isMobile ? '100px' : '100px', 
        }}>
        <Typography variant="h5" align="center" style={{ color: 'white', fontWeight: 'bold', marginBottom: '16px' }}>
          {t("textoTop")}
        </Typography>
        <Grid container spacing={2} justifyContent="center">
          <Grid item xs={12} md={4} textAlign="center">
            {ranking && (
              <Box>
                <img src={require('./images/brain-top.png')} alt="Primero" style={{ width: '90%', maxWidth: '160px', marginBottom: '8px' }} />
                <Typography variant="h6" style={{ fontWeight: 'bold', color: 'white' }}>{ranking.primero}</Typography>
              </Box>
            )}
          </Grid>
          <Grid item container xs={12} spacing={2} justifyContent="center">
            <Grid item xs={12} sm={6} md={4} textAlign="center">
              {ranking && (
                <Box>
                  <img src={require('./images/brain-top2.png')} alt="Segundo" style={{ width: '110%', maxWidth: '120px', marginBottom: '6px' }} />
                  <Typography variant="h6" style={{ fontWeight: 'bold', color: 'white' }}>{ranking.segundo}</Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6} md={4} textAlign="center">
              {ranking && (
                <Box>
                  <img src={require('./images/brain-top3.png')} alt="Tercero" style={{ width: '110%', maxWidth: '120px', marginBottom: '6px' }} />
                  <Typography variant="h6" style={{ fontWeight: 'bold', color: 'white' }}>{ranking.tercero}</Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Box>

      <Box
        sx={{
          borderRadius: 8,
          padding: 3,
          bgcolor: '#fff',
          border: '1px solid #ddd',
          width: '60%',
        }}
        mb={10}
      >
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={6}>
            <FormControl fullWidth sx={{ 
                  backgroundColor: '#FFFFFF',
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#EE6D72',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                      color: '#EE6D72',
                    },
                  },
                }}>
              <InputLabel id="sortBy-label">{t("ordenar")} </InputLabel>
              <Select
                value={sortBy}
                onChange={handleSortByChange}
                labelId="sortBy-label"
                label={t("ordenar")}
              >
                <MenuItem value="ratio">{t("ratioRanking")}</MenuItem>
                <MenuItem value="totalRightQuestions">{t("aciertosRanking")}</MenuItem>
                <MenuItem value="totalQuestionsAnswered">{t("pregRespRanking")}</MenuItem>
                <MenuItem value="totalGamesPlayed">{t("partJugRanking")}</MenuItem>
                <MenuItem value="totalTime">{t("tiempoJugadoRanking")}</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                name="Número de usuarios"
                onChange={handleLimit}
                value={userLimit}
                type="number"
                step="1"
                label={t("numUsuarios")}
                inputProps={{
                  inputMode: 'numeric',
                  min: 1,
                  max: 20,
                }}
                sx={{ 
                  backgroundColor: '#FFFFFF',
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#EE6D72',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                      color: '#EE6D72',
                    },
                  },
                }}
              />
            </FormControl>
          </Grid>
        </Grid>

        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center"><strong>{t("posicion")}</strong></TableCell>
              <TableCell align="center"><strong>{t("usuario")}</strong></TableCell>
              <TableCell align="center">
                <strong>
                {sortByLabels[sortBy] || ""}
                </strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.isArray(rankingTable) && rankingTable.map((user, index) => (
              <TableRow key={index}>
                <TableCell align="center">{index + 1}</TableCell>
                <TableCell align="center">{user.userId}</TableCell>
                <TableCell align="center">
                  {sortBy === "ratio"
                    ? user.ratio
                    : sortBy === "totalQuestionsAnswered"
                    ? user.totalQuestionsAnswered
                    : sortBy === "totalRightQuestions"
                    ? user.totalRightQuestions
                    : sortBy === "totalGamesPlayed"
                    ? user.totalGamesPlayed
                    : sortBy === "totalTime"
                    ? user.totalTime
                    : ""}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <div>
      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
      )}
      </div>
    </CustomContainer>
  );
};

export default Ranking;


