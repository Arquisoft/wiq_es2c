import React, {useCallback, useState} from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Menu, MenuItem, Grid, Button, Hidden} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';
const NavigationBar_Game = () => {

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const location = useLocation();

    const isHiddenRoute = location.pathname !== '/Game' ;

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


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
                        <Tooltip title="Inicio">
                        <Button variant="contained" color="inherit" style={{ background: '#9A77B0', border: 'none', padding: 0, marginRight: '10px' }} onClick={showHome}>
                            <img src={require('../images/home.png')} style={{ width: '50px', height: '50px' }} alt="Imagen home"/>
                        </Button>
                        </Tooltip>
                    </Grid>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
};

export default NavigationBar_Game;