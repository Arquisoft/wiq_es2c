import React, { useState } from 'react';
import { Container, Typography, Button, Box, Snackbar } from '@mui/material';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';


const PantallaInicio = () => {

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState('');
    
    const { usernameGlobal} = useUser();

    const navigate = useNavigate();

    function nuevaPartida() {
        navigate("/Game");
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const showAllUsers = () => {
        navigate("/AllUsers")
    };

    const showAllQuestions = () => {
        navigate("/AllQuestions")
    };


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

            <Box sx={{
                display: 'flex',
                flexDirection: 'column', // Alinea los elementos verticalmente
                justifyContent: 'center', // Centra horizontalmente
                alignItems: 'center'
            }}>
                <Button variant="contained" color="inherit" align="center" style={{ background: 'white', border: 'none', padding: 0, marginRight: '10px' }} onClick={showAllUsers}>
                    <img src={require('./images/allusers.png')} style={{ width: '50px', height: '50px' }} alt="Imagen all users"/>
                </Button>
                <Button variant="contained" color="inherit" align="center" style={{ background: 'white', border: 'none', padding: 0, marginRight: '10px' }} onClick={showAllQuestions}>
                    <img src={require('./images/questions.png')} style={{ width: '50px', height: '50px' }} alt="Imagen questions"/>
                </Button>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message="Sesion cerrada" />
            {error && (
                <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
            )}

        </Container>
    );
};

export default PantallaInicio;