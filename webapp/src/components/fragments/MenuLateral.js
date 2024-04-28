import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, Box, Typography, Select, MenuItem, FormControl, Avatar, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../UserContext';
import ListItemIcon from '@mui/material/ListItemIcon';
import HistoryIcon from '@mui/icons-material/History';
import StarIcon from '@mui/icons-material/Star';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';



function MenuLateral() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [language, setLanguage] = useState('');

    const [t, i18n] = useTranslation("global");

    const navigate = useNavigate();
    const { usernameGlobal,  setUsernameGlobal } = useUser();

    const [setError] = useState('');

    const location = useLocation();

    const isHiddenRoute = location.pathname === '/' || location.pathname === '/App' || location.pathname === '/Game';


    const toggleDrawer = (open) => (event) => {
        setDrawerOpen(open);
    };

    const handleChange = (event) => {
        setLanguage(event.target.value);
    };

    const showInicio = () => {
        if(usernameGlobal === 'admin'){
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

    const list = () => (
    <Box
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        sx={{ width: 300,  display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center', }} // Aquí es donde estableces la anchura del Drawer
        >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px', mt: 5 }}>
        <Avatar alt="Remy Sharp" src="../images/brain-icon2.ico" sx={{ marginRight: 2 }} />
            <Typography variant="h6" sx={{ fontFamily: 'Arial', color: '#EE6D72', fontWeight: 'bold' }}>
                BrainWIQ
            </Typography>
        </Box>
        <List>
            <ListItem>
            <FormControl sx={{ m: 2, minWidth: 120 }}>
            <Typography variant="h8" sx={{ fontFamily: 'Arial', color: '#EE6D72' }}>{t("idioma")}:</Typography>
                <Select
                    value={language}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    MenuProps={{
                        PaperProps: {
                        style: {
                            backgroundColor: '#f8b6bc', // Aquí puedes cambiar el color del menú
                        },
                        },
                    }}
                >
                    <MenuItem value="" disabled>
                        {t("seleccionar")}
                    </MenuItem>
                    <MenuItem value={'English'} onClick={() => i18n.changeLanguage('en')}>{t("ingles")}</MenuItem>
                    <MenuItem value={'Spanish'} onClick={() => i18n.changeLanguage('es')}>{t("espanol")}</MenuItem>
                </Select>
            </FormControl>
            </ListItem>
        </List>
        </Box>
    );

    const listaCompleta = () => (
    <Box
        role="presentation2"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
        sx={{ width: 300,  display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center', }} // Aquí es donde estableces la anchura del Drawer
        >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', padding: '16px', mt: 5 }}>
        <Avatar alt="Remy Sharp" src="../images/brain-icon2.ico" sx={{ marginRight: 2 }} />
            <Typography variant="h6" sx={{ fontFamily: 'Arial', color: '#EE6D72', fontWeight: 'bold' }}>
                BrainWIQ
            </Typography>
        </Box>
        <List>
            <ListItem>
            <FormControl sx={{ m: 2, minWidth: 120 }}>
            <Typography variant="h8" sx={{ fontFamily: 'Arial', color: '#EE6D72' }}>{t("idioma")}:</Typography>
                <Select
                    value={language}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    MenuProps={{
                        PaperProps: {
                        style: {
                            backgroundColor: '#f8b6bc', // Aquí puedes cambiar el color del menú
                        },
                        },
                    }}
                    sx={{ my: 2 }}
                >
                    <MenuItem value="" disabled >
                        {t("seleccionar")}
                    </MenuItem>
                    <MenuItem value={'English'} onClick={() => i18n.changeLanguage('en')}>{t("ingles")}</MenuItem>
                    <MenuItem value={'Spanish'} onClick={() => i18n.changeLanguage('es')}>{t("espanol")}</MenuItem>
                </Select>
                <MenuItem onClick={showGameHistory} sx={{ my: 2, fontFamily: 'Arial', color: '#EE6D72'  }}>
                    <ListItemIcon>
                        <HistoryIcon />
                    </ListItemIcon>
                    {t("toolHistorico")}
                </MenuItem>
                <MenuItem onClick={showRanking} sx={{ my: 2, fontFamily: 'Arial', color: '#EE6D72' }}>
                    <ListItemIcon>
                        <StarIcon />
                    </ListItemIcon>
                    {t("toolRanking")}
                </MenuItem>
                <MenuItem onClick={showPerfil} sx={{ my: 2, fontFamily: 'Arial', color: '#EE6D72' }}>
                    <ListItemIcon>
                        <AccountCircleIcon />
                    </ListItemIcon>
                    {t("toolPerfil")}
                </MenuItem>
                <MenuItem onClick={showLogout} sx={{ my: 2, fontFamily: 'Arial', color: '#EE6D72' }}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    {t("toolLogOut")}
                </MenuItem>
            </FormControl>
            </ListItem>
        </List>
        </Box>
    );

    if (location.pathname === '/App' || location.pathname === '/') {
        return (
            <div>
            <AppBar position="static" style={{ backgroundColor: '#f8b6bc' }}>
                <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <Typography sx={{ flexGrow: 2, fontFamily: 'Arial', color: '#FFFFFF', fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>
                    BrainWIQ
                </Typography>
                {/* Rest of your AppBar/Toolbar components */}
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>
            </div>
        );
    }


    if(location.pathname === '/Game') {
        return (
            <div>
            <AppBar position="static" style={{ backgroundColor: '#f8b6bc' }}>
                <Toolbar>
                <IconButton edge="start" color="inherit" aria-label="menu2" onClick={toggleDrawer(true)}>
                    <MenuIcon />
                </IconButton>
                <Button onClick={showInicio} sx={{ flexGrow: 2, fontFamily: 'Arial', color: '#FFFFFF', fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>
                    BrainWIQ2
                </Button>
                {/* Rest of your AppBar/Toolbar components */}
                </Toolbar>
            </AppBar>
            <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
                {list()}
            </Drawer>
            </div>
        );
    }

    if (isHiddenRoute) {
        return null; 
    }

    return (
        <div>
        <AppBar position="static" style={{ backgroundColor: '#f8b6bc' }}>
            <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu3" onClick={toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
            <Button onClick={showInicio} sx={{ flexGrow: 2, fontFamily: 'Arial', color: '#FFFFFF', fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>
                BrainWIQ
            </Button>
            {/* Rest of your AppBar/Toolbar components */}
            </Toolbar>
        </AppBar>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
            {listaCompleta()}
        </Drawer>
        </div>
    );
}

export default MenuLateral;