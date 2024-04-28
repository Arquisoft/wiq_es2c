// src/components/Login.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Typography, TextField, Button, Snackbar } from '@mui/material';
import { useUser } from './UserContext';
import '../App.css';
import { useTranslation } from 'react-i18next';

import { CustomContainer } from '../CustomContainer';



const Login = () => {
  
  const [t] = useTranslation("global");

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [createdAt, setCreatedAt] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  const navigate = useNavigate();

  const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

  const { setUsernameGlobal } = useUser();

  const loginUser = async () => {
    try {
      const response = await axios.post(`${apiEndpoint}/login`, { username, password });

      // Extract data from the response
      const { createdAt: userCreatedAt } = response.data;

      setCreatedAt(userCreatedAt);
      console.log(createdAt);
      
      setLoginSuccess(true);

      setOpenSnackbar(true);
    } catch (error) {
      setError(error.response.data.error);
    }
  };
  

  useEffect(() => {
    if (loginSuccess && username === 'admin') {
      setUsernameGlobal(username);
      navigate("/PantallaInicioAdmin");
      
    } else if(loginSuccess){
      setUsernameGlobal(username);
      navigate("/PantallaInicio");
    }
  }, [loginSuccess, navigate, setUsernameGlobal, username]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  

  return (
      <CustomContainer component="main" maxWidth="xxl"
                sx={{
                    marginTop: 4,
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
          {loginSuccess ? (
              null

          ) : (
            
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Typography component="h1" variant="h5" align="center" sx={{ marginBottom: 2, fontWeight: 'bold', 
                fontFamily: 'Arial', color: '#EE6D72' }}>
                {t("login")}
              </Typography>
              <TextField
                margin="normal"
                fullWidth
                label={t("usuario")}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                sx={{ 
                  marginBottom: 4, 
                  backgroundColor: '#FFFFFF',
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#EE6D72',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                      color: '#EE6D72',
                    },
                  },
                }}
              />
              <TextField
                margin="normal"
                fullWidth
                label={t("password")}
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ 
                  marginBottom: 4, 
                  backgroundColor: '#FFFFFF',
                  '& .MuiOutlinedInput-root': {
                    '&.Mui-focused fieldset': {
                      borderColor: '#EE6D72',
                    },
                  },
                  '& .MuiInputLabel-root': {
                    '&.Mui-focused': {
                      color: '#EE6D72',
                    },
                  },
                }}
              />
              <Button variant="contained" color="primary" sx={{marginTop: 4,marginBottom: 4, backgroundColor: '#f8b6bc',  color: '#413C3C',  fontWeight: 'bold',  transition: 'transform 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f8b6bc',
                  transform: 'scale(1.1)'
                }}} onClick={loginUser}>
                {t("botonLogin")}
              </Button>
              <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={t('mensajeLogin')} />
              {error && (
                <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
              )}
            </div>  
          )}

      </CustomContainer>
  );
};

export default Login;