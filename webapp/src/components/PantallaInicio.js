import React, { useState } from 'react';
import { Container, Typography, Button, Box, Snackbar } from '@mui/material';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import NewGameIcon from '@mui/icons-material/SportsEsports';
import '../App.css';


const PantallaInicio = () => {

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState('');
    
    const { usernameGlobal} = useUser();

    const navigate = useNavigate();

    function nuevaPartida() {
        navigate("/GameConfiguration");
    }

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };


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

            <Box sx={{
                display: 'flex',
                flexDirection: 'column', // Alinea los elementos verticalmente
                justifyContent: 'center', // Centra horizontalmente
                alignItems: 'center'
            }}>
                <Typography component="h1" variant="h6" align="center" sx={{ marginBottom: 4, fontWeight: 'bold' }}>
                    ¡BIENVENIDO A WIQ  {usernameGlobal}!
                </Typography>

                <Button startIcon={<NewGameIcon />} variant="contained" color="primary" align="center" sx={{ marginTop: 4, backgroundColor: '#FCF5B8',  color: '#413C3C',  fontWeight: 'bold' }}
                    onClick={nuevaPartida}>
                    NUEVA PARTIDA
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