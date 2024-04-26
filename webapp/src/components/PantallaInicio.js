import React, { useState } from 'react';
import { Container, Typography, Button, Box, Snackbar } from '@mui/material';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import NewGameIcon from '@mui/icons-material/SportsEsports';
import '../App.css';
import { useTranslation } from 'react-i18next';


const PantallaInicio = () => {

    const [t] = useTranslation("global");
    const { usernameGlobal} = useUser();

    const navigate = useNavigate();

    function nuevaPartida() {
        navigate("/GameConfiguration");
    }

    return (
        <Container component="main" maxWidth="xxl"
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
                    {t("textoInicio")} {usernameGlobal}!
                </Typography>

                <Button startIcon={<NewGameIcon />} variant="contained" color="primary" align="center" sx={{ marginTop: 4, backgroundColor: '#FCF5B8',  color: '#413C3C',  fontWeight: 'bold' }}
                    onClick={nuevaPartida}>
                    {t("botonPartida")}
                </Button>
            </Box>
        </Container>
        
    );
};

export default PantallaInicio;