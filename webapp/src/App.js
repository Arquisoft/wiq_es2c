import React, { useState } from 'react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import './App.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
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
        </Container>
    </ThemeProvider>
  );
}

export default App;