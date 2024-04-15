import React, { useState } from 'react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

function App() {
  const [showLogin, setShowLogin] = useState(true);

  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };

  return (
    <Container component="main" maxWidth="xxl"
            sx={{
              backgroundColor: '#F3D3FA',
              borderRadius: '10px',
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
            ¿No tienes cuenta? Registrate aquí.
          </Link>
        ) : (
          <Link component="button" variant="body2" onClick={handleToggleView}>
            ¿Ya tienes cuenta? Inicia sesión aquí.
          </Link>
        )}
      </Typography>
    </Container>
  );
}

export default App;