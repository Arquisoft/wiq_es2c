// src/components/NavigationBar.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Grid, Button, Hidden} from '@mui/material';
import { useUser } from '../UserContext';
import MenuIcon from '@mui/icons-material/Menu';

const NavigationBar = () => {

    const [setError] = useState('');
    const { usernameGlobal, setUsernameGlobal } = useUser();
    const navigate = useNavigate();

    const location = useLocation();

    const isHiddenRoute = location.pathname === '/' || location.pathname === '/App' || location.pathname === '/Game';

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const showHome = () => {
        navigate("/PantallaInicio")
    };

    const showGameHistory = () => {
        navigate("/Gamehistory")
    };

    const showRanking = () => {
        navigate("/Ranking")
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
            <Toolbar>
                <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleMenu}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                >
                    <MenuItem onClick={showHome}>Inicio</MenuItem>
                    <MenuItem onClick={showGameHistory}>Historial de Juegos</MenuItem>
                    <MenuItem onClick={showRanking}>Ranking</MenuItem>
                    <MenuItem onClick={showLogout}>Cerrar Sesión</MenuItem>
                </Menu>
                <Hidden smDown>
                <Grid container justifyContent="flex-start">
                    <Button variant="contained" color="inherit" style={{ background: '#9A77B0', border: 'none', padding: 0, marginRight: '10px' }} onClick={showHome}>
                        <img src={require('../images/home.png')} style={{ width: '50px', height: '50px' }} alt="Imagen home"/>
                    </Button>
                    <Button variant="contained" color="inherit" style={{ background: '#9A77B0', border: 'none', padding: 0, marginRight: '10px' }} onClick={showGameHistory}>
                        <img src={require('../images/iconHistory.png')} style={{ width: '50px', height: '50px' }} alt="Imagen historico"/>
                    </Button>
                    <Button variant="contained" color="inherit" style={{ background: '#9A77B0', border: 'none', padding: 0, marginRight: '10px' }} onClick={showRanking}>
                        <img src={require('../images/iconRanking.png')} style={{ width: '50px', height: '50px' }} alt="Imagen ranking"/>
                    </Button>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Button variant="contained" color="inherit" style={{ background: '#9A77B0', border: 'none', padding: 0, width: '50px', marginRight: '10px' }}>
                        <img src={require('../images/iconUser.png')} style={{ width: '50px', height: '50px' }} alt="Imagen usuario"/>
                    </Button>
                    <Button variant="contained" color="inherit" style={{ background: '#9A77B0', border: 'none', padding: 0, marginRight: '10px' }} onClick={showLogout}>
                        <img src={require('../images/logout.png')} style={{ width: '50px', height: '50px' }} alt="Imagen logout"/>
                    </Button>
                </Grid>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;