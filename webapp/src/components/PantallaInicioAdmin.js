import React, { useState } from 'react';
import { Container, Button, Box, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../App.css';


const PantallaInicio = () => {

    const [t, i18n] = useTranslation("global");


    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

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

            <Box sx={{
                display: 'flex',
                flexDirection: 'column', // Alinea los elementos verticalmente
                justifyContent: 'center', // Centra horizontalmente
                alignItems: 'center'
            }}>
                <Button variant="contained" color="primary" sx={{marginTop: 4,marginBottom: 4, backgroundColor: '#FCF5B8',  color: '#413C3C',  fontWeight: 'bold' }} onClick={showAllUsers}>
                    {t("botonUsuarios")}
                </Button>
                <Button variant="contained" color="primary" sx={{marginTop: 4,marginBottom: 4, backgroundColor: '#FCF5B8',  color: '#413C3C',  fontWeight: 'bold' }} onClick={showAllQuestions}>
                    {t("botonPreguntas")}
                </Button>
            </Box>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={t("mensajeLogOut")} />
            {error && (
                <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
            )}

        </Container>
    );
};

export default PantallaInicio;