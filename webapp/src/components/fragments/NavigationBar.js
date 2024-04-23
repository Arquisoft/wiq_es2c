// src/components/NavigationBar.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Grid, Button, Hidden} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import { useUser } from '../UserContext';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';


const NavigationBar = () => {

    const [t] = useTranslation("global");

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
        if (usernameGlobal === 'admin') {
            navigate("/PantallaInicioAdmin");
            
        } else {
            navigate("/PantallaInicio");
        }
    };

    const showGameHistory = () => {
        navigate("/Gamehistory")
    };

    const showPerfil = () => {
        navigate("/Perfil")
    }

    const showRanking = () => {
        navigate("/Ranking")
    };

    const showLogout = () => {
        try {
            setUsernameGlobal('');
            navigate('/App');
        } catch (error) {
            setError(error.response.data.error);
        }
    };

    if (location.pathname === '/App' || location.pathname === '/') {
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
                        <MenuItem onClick={() => i18n.changeLanguage('es')}>Español</MenuItem>
                        <MenuItem onClick={() => i18n.changeLanguage('en')}>Inglés</MenuItem>
                    </Menu>
                    <Hidden smDown>
                    <Grid container justifyContent="flex-start">
                    </Grid>
                    <Grid container justifyContent="flex-end">
                        <Tooltip title="Español">
                        <Button variant="contained" color="inherit" 
                            style={{ background: '#9A77B0', border: 'none', padding: 0, marginRight: '10px' }} 
                            onClick={() => i18n.changeLanguage('es')}>
                            <img src={require('../images/esp.png')} style={{ width: '50px', height: '50px' }} alt="Imagen español"/>
                        </Button>
                        </Tooltip>
                        <Tooltip title="Inglés">
                        <Button variant="contained" color="inherit" 
                            style={{ background: '#9A77B0', border: 'none', padding: 0, marginRight: '10px' }} 
                            onClick={() => i18n.changeLanguage('en')}>
                            <img src={require('../images/ing.png')} style={{ width: '50px', height: '50px' }} alt="Imagen español"/>
                        </Button>
                        </Tooltip>                    
                    </Grid>
                    </Hidden>
                </Toolbar>
            </AppBar>
        );
    }

    if(location.pathname === '/Game') {
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
                    </Menu>
                    <Hidden smDown>
                        <Grid container justifyContent="flex-start">
                            <Tooltip title={t("toolInicio")}>
                            <Button variant="contained" color="inherit" style={{ background: '#9A77B0', border: 'none', padding: 0, marginRight: '10px' }} onClick={showHome}>
                                <img src={require('../images/home.png')} style={{ width: '50px', height: '50px' }} alt="Imagen home"/>
                            </Button>
                            </Tooltip>
                        </Grid>
                    </Hidden>
                </Toolbar>
            </AppBar>
        );
    }
    

    if (isHiddenRoute) {
        return null; 
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
                    <MenuItem onClick={showPerfil}>Perfil</MenuItem>
                    <MenuItem onClick={showLogout}>Cerrar Sesión</MenuItem>
                </Menu>
                <Hidden smDown>
                <Grid container justifyContent="flex-start">
                    <Tooltip title={t("toolInicio")}>
                    <Button variant="contained" color="inherit" style={{ background: '#9A77B0', border: 'none', padding: 0, marginRight: '10px' }} onClick={showHome}>
                        <img src={require('../images/home.png')} style={{ width: '50px', height: '50px' }} alt="Imagen home"/>
                    </Button>
                    </Tooltip>
                    <Tooltip title={t("toolHistorico")}>
                    <Button variant="contained" color="inherit" style={{ background: '#9A77B0', border: 'none', padding: 0, marginRight: '10px' }} onClick={showGameHistory}>
                        <img src={require('../images/iconHistory.png')} style={{ width: '50px', height: '50px' }} alt="Imagen historico"/>
                    </Button>
                    </Tooltip>
                    <Tooltip title={t("toolRanking")}>
                    <Button variant="contained" color="inherit" style={{ background: '#9A77B0', border: 'none', padding: 0, marginRight: '10px' }} onClick={showRanking}>
                        <img src={require('../images/iconRanking.png')} style={{ width: '50px', height: '50px' }} alt="Imagen ranking"/>
                    </Button>
                    </Tooltip>
                </Grid>
                <Grid container justifyContent="flex-end">
                    <Tooltip title={t("toolPerfil")}>
                    <Button variant="contained" color="inherit" style={{ background: '#9A77B0', border: 'none', padding: 0, width: '50px', marginRight: '10px' }} onClick={showPerfil}>
                        <img src={require('../images/iconUser.png')} style={{ width: '50px', height: '50px' }} alt="Imagen usuario"/>
                    </Button>
                    </Tooltip>
                    <Tooltip title={t("toolLogOut")}>
                    <Button variant="contained" color="inherit" style={{ background: '#9A77B0', border: 'none', padding: 0, marginRight: '10px' }} onClick={showLogout}>
                        <img src={require('../images/logout.png')} style={{ width: '50px', height: '50px' }} alt="Imagen logout"/>
                    </Button>
                    </Tooltip>
                    
                </Grid>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar;