import React, { useState } from 'react';
import AddUser from './components/AddUser';
import Login from './components/Login';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import './App.css';
import { useTranslation } from 'react-i18next';
import { CustomContainer } from './CustomContainer';


function App() {

  const [t] = useTranslation("global");
  
  const [showLogin, setShowLogin] = useState(true);

  const handleToggleView = () => {
    setShowLogin(!showLogin);
  };

  return (
      <CustomContainer>
        <Box border={2} borderColor="black" p={3} borderRadius={8} bgcolor="#FFD6D6" width="20%" maxWidth={800} height="auto" maxHeight="600px" display="flex" flexDirection="column" alignItems="center">
          <CssBaseline />
          {showLogin ? <Login /> : <AddUser />}
          <Typography component="div" align="center" sx={{ marginTop: 2 }}>
            {showLogin ? (
              <Link name="gotoregister" component="button" variant="body2" onClick={handleToggleView} sx={{ color: '#EE6D72' }}>
                {t("enlaceLogin")}
              </Link>
            ) : (
              <Link component="button" variant="body2" onClick={handleToggleView} sx={{ color: '#EE6D72' }}>
                {t("enlaceRegistro")}
              </Link>
            )}
          </Typography>
        </Box>
      </CustomContainer>
  );
}

export default App;