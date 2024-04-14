// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { Container, Typography, TextField, Button, Snackbar, skeletonClasses } from '@mui/material';
import '../App.css';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const GameConfiguration = () => {
    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [selectedOption, setSelectedOption] = useState(null);

    const maxTime = 60;
    const [valueTime, setValueTime] = useState(30);

    const maxQuestions = 30;
    const [valueQuestion, setValueQuestion] = useState(5);
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleChangeTime = (event) => {
        let inputValue = parseInt(event.target.value);

        if (!isNaN(inputValue) && inputValue >= 0) {

            inputValue = Math.min(inputValue, maxTime);
            setValueTime(inputValue);
        }
    };

    const handleChangeQuestions = (event) => {
        let inputValue = parseInt(event.target.value);

        if (!isNaN(inputValue) && inputValue >= 0) {

            inputValue = Math.min(inputValue, maxQuestions);
            setValueQuestion(inputValue);
        }
    };

    const configureAndStart = async () => {
        try {
            await axios.post(`${apiEndpoint}/configureGame`, {valueTime, valueQuestion});
            navigate("/Game", {state: {time: valueTime, question:valueQuestion, thematic:selectedOption}});
        } catch (error) {
            setError(error.response.data.error);
            setOpenSnackbar(true);
        }
    };

    const handleOptionSelect = (event) => {
        setSelectedOption(event.target.value);
    };

    return (
        <Container component="main" maxWidth="xl"
                   sx={{
                       marginTop: 10,
                       borderRadius: '10px',
                       display: 'flex',
                       flexDirection: 'column',
                       justifyContent: 'center',
                       alignItems: 'center',
                   }}>
            <Typography component="h1" variant="h5" align="center" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                Configuración de la partida
            </Typography>
            <TextField
                name="questions"
                margin="normal"
                fullWidth
                label="Número de preguntas"
                onChange={handleChangeQuestions}
                value={valueQuestion}
                type="number"
                step="1"
                sx={{ width: '50vh', marginBottom: 2, backgroundColor: '#FFFFFF'}}

                inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    min: 1,
                    max: 30,
                }}
            />
            <TextField
                name="time"
                margin="normal"
                fullWidth
                label="Tiempo disponible por pregunta"
                onChange={handleChangeTime}
                value={valueTime}
                type="number"
                step="1"
                sx={{ width: '50vh', marginBottom: 2, backgroundColor: '#FFFFFF'}}
                inputProps={{
                    inputMode: 'numeric',
                    min: 10,
                    max: 60,
                }}
            />
            <div>
                <select onChange={handleOptionSelect}>
                    <option value="">Selecciona la temática de las preguntas:</option>
                    <option value="Todas">Todas</option>
                    <option value="Geografia">Geografia</option>
                    <option value="Cultura">Cultura</option>
                    <option value="Informatica">Informatica</option>
                    <option value="Personajes">Personajes</option>
                </select>
            </div>
            <Button variant="contained" color="primary" sx={{marginTop: 4,marginBottom: 4, backgroundColor: '#FCF5B8',  color: '#413C3C',  fontWeight: 'bold'}}
                onClick={configureAndStart}>
                JUGAR
            </Button>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbarMessage} />
            {error && (
                <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
            )}
        </Container>
    );
};

export default GameConfiguration;
