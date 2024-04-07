// src/components/NavigationBar.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Button, Grid } from '@mui/material';
import { useUser } from './UserContext';

const NavigationBar = () => {

    const [setError] = useState('');
    const { usernameGlobal, setUsernameGlobal } = useUser();
    const navigate = useNavigate();

    const location = useLocation();

    const isHiddenRoute = location.pathname === '/' || location.pathname === '/App' || location.pathname === '/Game';


    const showHome = () => {
        navigate("/PantallaInicio")
    };

    const showGameHistory = () => {
        navigate("/Gamehistory")
    };

    const showLogout = () => {
        try {
            setUsernameGlobal('');
            console.log(usernameGlobal);
            navigate('/App');
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    if (isHiddenRoute) {
        return null; // Si no estás en / o /App, no muestra la barra de navegación
    }

  return (
    <AppBar position="fixed" sx={{ backgroundColor: '#9A77B0' }}>
        <Grid container justifyContent="space-between">
            {/* Columna izquierda */}
            <Grid item>
                <Button variant="contained" color="inherit" style={{ background: 'white', border: 'none', padding: 0, marginRight: '10px', marginLeft: '10px'}} onClick={showHome}>
                    <img src={require('./images/home.png')} style={{ width: '50px', height: '50px' }} alt="Imagen home"/>
                </Button>
                <Button variant="contained" color="inherit" style={{ background: 'white', border: 'none', padding: 0, marginRight: '10px' }} onClick={showGameHistory}>
                    <img src={require('./images/iconHistory.jpeg')} style={{ width: '50px', height: '50px' }} alt="Imagen historico"/>
                </Button>
                <Button variant="contained" color="inherit" style={{ background: 'white', border: 'none', padding: 0, width: '50px', marginRight: '10px' }}>
                    <img src={require('./images/iconUser.jpeg')} style={{ width: '50px', height: '50px' }} alt="Imagen usuario"/>
                </Button>
            </Grid>
            {/* Columna derecha */}
            <Grid item>
                <Button variant="contained" color="inherit" style={{ background: 'white', border: 'none', padding: 0, marginRight: '10px' }} onClick={showLogout}>
                    <img src={require('./images/logout.png')} style={{ width: '50px', height: '50px' }} alt="Imagen logout"/>
                </Button>
            </Grid>
        </Grid>
    </AppBar>
  );
};

export default NavigationBar;