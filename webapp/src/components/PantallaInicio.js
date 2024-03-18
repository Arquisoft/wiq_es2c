import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Box, Snackbar } from '@mui/material';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';


const PantallaInicio = () => {

    const [loginSuccess, setLoginSuccess] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState('');
    
    const { usernameGlobal } = useUser();

    const { setUsernameGlobal } = useUser();

    const navigate = useNavigate();

    function nuevaPartida() {
        navigate("/Partida")
    }

    const logoutUser = async () => {
        try {
            setLoginSuccess(false);
            setUsernameGlobal('');
            navigate('/App');
            
            setOpenSnackbar(true);
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container component="main" maxWidth="xl"
            sx={{
                marginTop: 4,
                backgroundColor: '#F3D3FA',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '95vh' 
            }}>

            <Box sx={{
                position: "absolute",
                top: 50,
                right: 20,
                display: "flex",
                gap: 2, // Espacio entre los botones
            }}> 
                <Button variant="contained" color="inherit" style={{ background: 'white', border: 'none', padding: 0 }}>
                    <img src={require('./images/iconHistory.jpeg')} style={{ width: '50px', height: '50px' }} alt="Imagen historico"/>
                </Button>

                <Button variant="contained" color="inherit" style={{ background: 'white', border: 'none', width: '50px' }}>
                    <img src={require('./images/iconUser.jpeg')} style={{ width: '50px', height: '50px' }} alt="Imagen usuario"/>
                </Button>
                
            </Box>

            <Box sx={{
                position: "absolute",
                top: 50,
                left: 20,
                display: "flex",
                gap: 2, // Espacio entre los botones
            }}> 
                <Button variant="contained" color="inherit" style={{ background: 'white', border: 'none', padding: 0 }} onClick={logoutUser}>
                    <img src={require('./images/logout.png')} style={{ width: '50px', height: '50px' }} alt="Imagen logout"/>
                </Button>
                
            </Box>

            <Box sx={{
                display: 'flex',
                flexDirection: 'column', // Alinea los elementos verticalmente
                justifyContent: 'center', // Centra horizontalmente
                alignItems: 'center'
            }}>
                <Typography component="h1" variant="h6" align="center" sx={{ marginBottom: 4, fontWeight: 'bold' }}>
                    ¡BIENVENIDO A WIQ  {usernameGlobal}!
                </Typography>

                <Button variant="contained" color="primary" align="center" sx={{ marginTop: 4, backgroundColor: '#FCF5B8',  color: '#413C3C',  fontWeight: 'bold' }}
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