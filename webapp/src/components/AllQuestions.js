import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '../App.css';

const AllQuestions = () => {

    const [t, i18n] = useTranslation("global");

    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';


    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState('');

    const getAllQuestions = useCallback(async () => {
        try {
            const response = await axios.get(`${apiEndpoint}/getAllQuestions`,{});
            setQuestions(response.data);
        } catch (error) {
            setError(error.response.data.error);
        }
    })
    
    useEffect(() => {
        getAllQuestions();
    }, [getAllQuestions]);
    

    return (
        
        <Container component="main" maxWidth="xxl"
        sx={{
            backgroundColor: '#F3D3FA',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', 
            width: '100%', 
        }}>
        <Typography component="h1" variant="h5" align="center" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
            {t("textoAllQuestions")}
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: '80%', marginBottom: 4 }}>
            <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center"><strong>{t("textoPregunta")}</strong></TableCell>
                    <TableCell align="center"><strong>{t("textoRespuesta")}</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {questions.map((q) => (
                    <TableRow key={q._id}>
                        <TableCell align="center">{q.enunciado}</TableCell>
                        <TableCell align="center">{q.respuesta_correcta}</TableCell>
                    </TableRow>
                ))}
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

export default AllQuestions;