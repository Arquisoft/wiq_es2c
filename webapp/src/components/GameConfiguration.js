// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';
import '../App.css';
import { useTranslation } from 'react-i18next';

const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

const GameConfiguration = () => {

    const [t] = useTranslation("global");

    const navigate = useNavigate();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [error, setError] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [selectedOption, setSelectedOption] = useState("Todas");

    const maxTime = 60;
    const [valueTime, setValueTime] = useState('undefined');
    const [previousValueTime, setPreviousValueTime] = useState('undefined');

    const maxQuestions = 30;
    const [valueQuestion, setValueQuestion] = useState('undefined');
    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleChangeTime = (event) => {
        let inputValue = parseInt(event.target.value);

        if (!isNaN(inputValue) && inputValue >= 0) {
                inputValue = Math.min(inputValue, maxTime);
                setValueTime(inputValue);
        }else{
            setValueTime('undefined');
        }
    };

    const handleChangeQuestions = (event) => {
        let inputValue = parseInt(event.target.value);
        if (!isNaN(inputValue) && inputValue >= 0) {

            inputValue = Math.min(inputValue, maxQuestions);
            setValueQuestion(inputValue);
        }else{
            setValueQuestion('undefined');
        }
    };

    const configureAndStart = async () => {
        try {
            if(valueTime < 10 || valueTime === 'undefined' ){
                setError("Debe introducir un tiempo igual o mayor a 10");
            }else if(valueQuestion < 2 || valueQuestion === 'undefined'){
                setError("Debe introducir un número de preguntas mayor o igual a 2");
            }else{
                await axios.post(`${apiEndpoint}/configureGame`, {valueTime, valueQuestion});
                navigate("/Game", {state: {time: valueTime, question:valueQuestion, thematic:selectedOption}});

            }

        } catch (error) {
            setError(error.response.data.error);
            setSnackbarMessage(error);
            setOpenSnackbar(true);
        }
    };

    const handleOptionSelect = (event) => {
        console.log(event.target.value);
        setSelectedOption(event.target.value);
    };

    return (
        <Container component="main" maxWidth="xl"
                sx={{
                    marginTop: 25,
                    borderRadius: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Typography component="h1" variant="h5" align="center" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                    {t("textoPersonalizar")}
                </Typography>
                <TextField
                    name="questions"
                    margin="normal"
                    label={t("textoNumPreg")}
                    placeholder="Número del 2 al 30"
                    onChange={handleChangeQuestions}
                    value={valueQuestion}
                    type="number"
                    step="1"
                    sx={{ width: '40vh',marginBottom: 4, marginTop: 3, backgroundColor: '#FFFFFF'}}

                inputProps={{
                    inputMode: 'numeric',
                    pattern: '[0-9]*',
                    min: 0,
                    max: 30,
                }}
            />
            <TextField
                name="time"
                margin="normal"
                fullWidth
                label={t("textoTiempoPreg")}
                placeholder="Número del 10 al 60"
                onChange={handleChangeTime}
                value={valueTime}
                type="number"
                step="1"
                sx={{ width: '40vh', marginBottom: 2, backgroundColor: '#FFFFFF'}}
                inputProps={{
                    inputMode: 'numeric',
                    min: 0,
                    max: 60,
                }}
            />
            <Typography component="p" variant="p" align="center" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
                {t("textoTematicas")}
            </Typography>
            <div>
                <select onChange={handleOptionSelect}>
                    <option value="Todas">{t("tematicaTodas")}</option>
                    <option value="Geografia">{t("tematicaGeo")}</option>
                    <option value="Cultura">{t("tematicaCult")}</option>
                    <option value="Informatica">{t("tematicaInf")}</option>
                    <option value="Personajes">{t("tematicaPersonajes")}</option>
                </select>
            </div>
            <Button variant="contained" color="primary" sx={{marginTop: 4,marginBottom: 4, backgroundColor: '#FCF5B8',  color: '#413C3C',  fontWeight: 'bold'}}
                onClick={configureAndStart}>
                {t("botonJugar")}
            </Button>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbarMessage} />
            {error && (
                <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
            )}
            </div>
        </Container>
);
};

export default GameConfiguration;
