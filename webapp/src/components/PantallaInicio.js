import React, { useState } from 'react';
import { Container, Typography, Button, Box, ImageIcon } from '@mui/material';
import { useUser } from './UserContext';

const PantallaInicio = () => {
    
    const { usernameGlobal } = useUser();

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
                height: '95vh' // Añadir bordes redondeados
            }}>

            <Box sx={{
                position: "absolute",
                top: 50,
                right: 20,
                display: "flex",
                gap: 2, // Espacio entre los botones
            }}> 
                <Button variant="contained" color="inherit" style={{ background: 'none', border: 'none', padding: 0 }}>
                    <img src={require('./images/iconHistory.jpeg')} style={{ width: '50px', height: '50px' }}/>
                </Button>

                <Button variant="contained" color="inherit" style={{ background: 'none', border: 'none', width: '50px' }}>
                    <img src={require('./images/iconUser.jpeg')} style={{ width: '50px', height: '50px' }}/>
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

                <Button variant="contained" color="primary" align="center" justifySelf = 'center' sx={{ marginTop: 4, backgroundColor: '#FCF5B8',  color: '#413C3C',  fontWeight: 'bold' }}>
                    NUEVA PARTIDA
                </Button>
            </Box>

        </Container>
    );
};

export default PantallaInicio;