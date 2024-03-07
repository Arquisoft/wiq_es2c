import React, { useState } from 'react';
import { Container, Typography, Button, Box } from '@mui/material';
import { useUser } from './UserContext';
import Game from "./Game";

const Partida = () => {
    
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
                height: '95vh' 
            }}>
            {<Game />}
        </Container>
    );
};

export default Partida;