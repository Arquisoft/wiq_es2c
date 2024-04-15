import React, {useCallback, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Button, Grid } from '@mui/material';
import { useUser } from './UserContext';
import axios from 'axios';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
const NavigationBar_Game = () => {

    const [error, setError] = useState('');
    const { usernameGlobal, setUsernameGlobal } = useUser();
    const navigate = useNavigate();

    const location = useLocation();

    const isHiddenRoute = location.pathname !== '/Game' ;


    const showHome = useCallback(async () => {
        try {
            axios.get(`${apiEndpoint}/restartGame`);
            navigate("/PantallaInicio")
        } catch (error) {
            console.log("Error: " + error.response.data.error);
            setError(error.response.data.error);
        }
    })

    if (isHiddenRoute) {
        return null; // Si no estás en / o /App, no muestra la barra de navegación
    }

    return (
        <AppBar position="fixed" sx={{ backgroundColor: '#9A77B0' }}>
            <Grid container justifyContent="space-between">
                {/* Columna izquierda */}
                <Grid item>
                    <Button variant="contained" color="inherit" style={{ background: '#9A77B0', border: 'none', padding: 0, marginRight: '10px', marginLeft: '10px'}} onClick={showHome}>
                        <img src={require('./images/home.png')} style={{ width: '50px', height: '50px' }} alt="Imagen home"/>
                    </Button>
                </Grid>
            </Grid>
        </AppBar>
    );
};

export default NavigationBar_Game;