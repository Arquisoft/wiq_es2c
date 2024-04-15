import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate} from 'react-router-dom';
import { Container, Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Snackbar,Button } from '@mui/material';

const AllUsers = () => {

    const navigate = useNavigate();
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';


    const [users, setUsers] = useState([]);
    const [error, setError] = useState('');



    const showHome = async () => {
        navigate('/PantallaInicio'); 
    }

    const getAllUsers = useCallback(async () => {
        try {
            const response = await axios.get(`${apiEndpoint}/getAllUsers`,{});
            setUsers(response.data);
        } catch (error) {
            setError(error.response.data.error);
        }
    })
    
    useEffect(() => {
        getAllUsers();
    }, [getAllUsers]);
    

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
        }}>
        <Button variant="contained" color="inherit" style={{ background: 'white', border: 'none', padding: 0, marginRight: '10px', marginLeft: '10px'}} onClick={showHome}>
                <img src={require('./images/home.png')} style={{ width: '50px', height: '50px' }} alt="Imagen home"/>
        </Button>
        <Typography component="h1" variant="h5" align="center" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
            TODOS LOS USUARIOS
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
    </Container>
    );
};

export default AllUsers;