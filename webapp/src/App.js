import React, { useState } from 'react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {Button, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';


const theme = createTheme({
  palette: {
    background: {
      default: '#F3D3FA',
    },
  },
});



function App() {

  const [t, i18n] = useTranslation("global");
  
  const [showLogin, setShowLogin] = useState(true);

  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };

  return (
    <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xl"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100vh', 
                  width: '100%', 
                }}>
          <CssBaseline />
          {showLogin ? <Login /> : <AddUser />}
          <Typography component="div" align="center" sx={{ marginTop: 2 }}>
            {showLogin ? (
              <Link name="gotoregister" component="button" variant="body2" onClick={handleToggleView}>
                {t("enlaceLogin")}
              </Link>
            ) : (
              <Link component="button" variant="body2" onClick={handleToggleView}>
                {t("enlaceRegistro")}
              </Link>
            )}
          </Typography>
          <div style={{ position: 'absolute', top: 0, right: 0 }}>
            {/* Aquí coloca tus dos botones */}
            <Tooltip title="Español">
            <Button variant="contained" color="inherit" 
              style={{ background: 'white', border: 'none', padding: 0, marginRight: '10px' }} 
              onClick={() => i18n.changeLanguage('es')}>
                <img src={require('./components/images/esp.png')} style={{ width: '50px', height: '50px' }} alt="Imagen español"/>
            </Button>
            </Tooltip>
            <Tooltip title="Inglés">
            <Button variant="contained" color="inherit" 
              style={{ background: 'white', border: 'none', padding: 0, marginRight: '10px' }} 
              onClick={() => i18n.changeLanguage('en')}>
                <img src={require('./components/images/ing.png')} style={{ width: '50px', height: '50px' }} alt="Imagen español"/>
            </Button>
            </Tooltip>
          </div>
        </Container>
    </ThemeProvider>
  );
}

export default App;