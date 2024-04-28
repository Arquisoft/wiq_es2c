import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import {Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Snackbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import '../App.css';
import { CustomContainer } from '../CustomContainer';

const AllUsers = () => {

    const [t] = useTranslation("global");


    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';


    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');


    const getAllUsers = useCallback(async () => {
        try {
            const response = await axios.get(`${apiEndpoint}/getAllUsers`,{});
            setUsers(response.data);
        } catch (error) {
            setError(error.message);
        }
    }, [apiEndpoint]);
    
    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);
    

    return (
        
        <CustomContainer>
        <Typography component="h1" variant="h5" align="center" sx={{ marginBottom: 2, fontWeight: 'bold', 
                fontFamily: 'Arial', color: '#EE6D72' }}>
            {t("textoAllUsers")}   
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: '80%', marginBottom: 4 }}>
            <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center"><strong>{t("usuario")}</strong></TableCell>
                    <TableCell align="center"><strong>{t("email")}</strong></TableCell>
                    <TableCell align="center"><strong>{t("creado")}</strong></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user._id}>
                        <TableCell align="center">{user.username}</TableCell>
                        <TableCell align="center">{user.email}</TableCell>
                        <TableCell align="center">{user.creado}</TableCell>
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

export default AllUsers;