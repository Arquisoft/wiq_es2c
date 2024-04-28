import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Snackbar } from '@mui/material';
import { useUser } from './UserContext';
import { useTranslation } from 'react-i18next';
import '../App.css';
import { CustomContainer } from '../CustomContainer';


const Perfil = () => {

    const [t] = useTranslation("global");
    
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

    const { usernameGlobal } = useUser();

    const [user, setUser] = useState([]);
    const [error, setError] = useState('');


    const getPerfil = useCallback(async () => {
        try {
            const response = await axios.get(`${apiEndpoint}/getUser`,{
            params: {
                username: usernameGlobal
            }
            });
            setUser(response.data);
        } catch (error) {
            setError(error.response.data.error);
        }
    }, [usernameGlobal, apiEndpoint]);
    
    useEffect(() => {
        getPerfil();
    }, [getPerfil]);
    

    return (
        
        <CustomContainer>
        <Typography component="h1" variant="h5" align="center" sx={{ marginBottom: 2, fontWeight: 'bold', 
                fontFamily: 'Arial', color: '#EE6D72' }}>
            {t("textoPerfil")}
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: '80%', marginBottom: 4 }}>
            <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center"><strong> {t("usuario")}</strong></TableCell>
                    <TableCell align="center"><strong>{t("email")}</strong></TableCell>
                    <TableCell align="center"><strong>{t("creado")}</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell align="center">{user.username}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">{user.creado}</TableCell>
                </TableRow>
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

export default Perfil;