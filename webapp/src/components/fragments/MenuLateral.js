import { useState } from 'react';
import { AppBar, Toolbar, IconButton, Drawer, List, ListItem, Box, Typography, Select, MenuItem, FormControl, Avatar, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';


function MenuLateral() {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [language, setLanguage] = useState('');

    const [t, i18n] = useTranslation("global");

    const navigate = useNavigate();

    const toggleDrawer = (open) => (event) => {
        setDrawerOpen(open);
    };

    const handleChange = (event) => {
        setLanguage(event.target.value);
    };

    const showInicio = () => {
        navigate("/PantallaInicio");
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

    return (
        <div>
        <AppBar position="static" style={{ backgroundColor: '#f8b6bc' }}>
            <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer(true)}>
                <MenuIcon />
            </IconButton>
            <Button onClick={showInicio} sx={{ flexGrow: 2, fontFamily: 'Arial', color: '#FFFFFF', fontWeight: 'bold', display: 'flex', justifyContent: 'center' }}>
                BrainWIQ
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

export default MenuLateral;