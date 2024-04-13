import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate} from 'react-router-dom';
import { Container, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Snackbar } from '@mui/material';
import { useUser } from './UserContext';

const Perfil = () => {

    const navigate = useNavigate();
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

    const { usernameGlobal } = useUser();

    const [user, setUser] = useState([]);
    const [error, setError] = useState('');


    const handlePreviousPage = async () => {
        navigate('/PantallaInicio'); 
    }

    const getPerfil = useCallback(async () => {
        try {
            const response = await axios.get(`${apiEndpoint}/getUser`,{
            params: {
                username: usernameGlobal
            }
            });
            console.log(usernameGlobal);
            setUser(response.data);
        } catch (error) {
            setError(error.response.data.error);
        }
    }, [usernameGlobal])
    
    useEffect(() => {
        getPerfil();
    }, [getPerfil]);
    

    return (
        
        <Container component="main" maxWidth="xl"
        sx={{
            backgroundColor: '#F3D3FA',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh', 
            width: '100%', 
        }}
        >
        <Typography component="h1" variant="h5" align="center" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
            PERFIL
        </Typography>
        <TableContainer component={Paper} sx={{ maxWidth: '80%', marginBottom: 4 }}>
            <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center"><strong>Usuario</strong></TableCell>
                    <TableCell align="center"><strong>Email</strong></TableCell>
                    <TableCell align="center"><strong>Creado</strong></TableCell>
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
    </Container>
    );
};

export default Perfil;