// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import '../App.css';


const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const AddUser = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');


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
      <Container component="main" maxWidth="xl"
                 sx={{
                     marginTop: 4,
                     borderRadius: '10px',
                     display: 'flex',
                     flexDirection: 'column',
                     justifyContent: 'center',
                     alignItems: 'center',
                 }}>
          <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
              <Typography component="h1" variant="h5" align="center" sx={{marginBottom: 2, fontWeight: 'bold'}}>
                  REGÍSTRATE
              </Typography>
              <TextField
                  name="username"
                  margin="normal"
                  fullWidth
                  label="Usuario"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  sx={{ marginBottom: 4, backgroundColor: '#FFFFFF'}}
              />
              <TextField
                  name="email"
                  margin="normal"
                  fullWidth
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  sx={{ marginBottom: 4, backgroundColor: '#FFFFFF'}}
              />
              <TextField
                  name="password"
                  margin="normal"
                  fullWidth
                  label="Contraseña"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  sx={{ marginBottom: 4, backgroundColor: '#FFFFFF'}}
              />

              <Button variant="contained" color="primary" sx={{marginTop: 4,marginBottom: 4, backgroundColor: '#FCF5B8',  color: '#413C3C',  fontWeight: 'bold' }} onClick={addUser}>
                  REGÍSTRATE
              </Button>
              <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}
                        message={snackbarMessage}/>
              {error && (
                  <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}
                            message={`Error: ${error}`}/>
              )}
          </div>
      </Container>
);
};

export default AddUser;
