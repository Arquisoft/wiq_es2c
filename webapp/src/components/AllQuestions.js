import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { Container, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '../App.css';
import { CustomContainer } from '../CustomContainer';

const AllQuestions = () => {

    const [t] = useTranslation("global");

    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

    const [questions, setQuestions] = useState([]);
    const [error, setError] = useState('');

    const getAllQuestions = useCallback(async () => {
        try {
            const response = await axios.get(`${apiEndpoint}/getAllQuestions`,{});
            setQuestions(response.data);
        } catch (error) {
            setError(error.message);
        }
    }, [apiEndpoint]);
    
    useEffect(() => {
        getAllQuestions();
    }, [getAllQuestions]);
    

    return (
        
        <CustomContainer>
        <Typography component="h1" variant="h5" align="center" sx={{ marginBottom: 2, fontWeight: 'bold', 
                fontFamily: 'Arial', color: '#EE6D72' }}>
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
    </CustomContainer>
    );
};

export default AllQuestions;