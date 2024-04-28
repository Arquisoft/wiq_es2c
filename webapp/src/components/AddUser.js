// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import {Typography, TextField, Button, Snackbar } from '@mui/material';
import '../App.css';
import { useTranslation } from 'react-i18next';
import { CustomContainer } from '../CustomContainer';


const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const [t] = useTranslation("global");


  const addUser = async () => {
    try {
      await axios.post(`${apiEndpoint}/adduser`, { username, email, password });
      setOpenSnackbar(true);
      setSnackbarMessage("Usuario añadido correctamente");
    } catch (error) {
      setError(error.response.data.error);
      setOpenSnackbar(true);
      setSnackbarMessage("Ya se ha registrado un usuario con ese nombre");
    }
  };
  
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
      <CustomContainer component="main" maxWidth="xl"
                sx={{
                    marginTop: 4,
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Typography component="h1" variant="h5" align="center" sx={{marginBottom: 2, fontWeight: 'bold', color: '#EE6D72'}}>
                {t("registro")}
              </Typography>
              <TextField
                  name="username"
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
                  name="email"
                  margin="normal"
                  fullWidth
                  label={t("email")}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  name="password"
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

              <Button variant="contained" color="primary" sx={{marginTop: 4,marginBottom: 4, backgroundColor: '#EE6D72',  color: '#413C3C',  fontWeight: 'bold',  transition: 'transform 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f8b6bc',
                  transform: 'scale(1.1)'
                }}} onClick={addUser}>
                {t("botonRegistro")}
              </Button>
              <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}
                        message={snackbarMessage}/>
              {error && (
                  <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}
                            message={`Error: ${error}`}/>
              )}
          </div>
      </CustomContainer>
);
};

export default AddUser;
