// src/components/AddUser.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { Typography, TextField, Button, Snackbar, FormControl, InputLabel, Select, MenuItem} from '@mui/material';
import '../App.css';
import { useTranslation } from 'react-i18next';
import { CustomContainer } from '../CustomContainer';


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
            setError(error.response.data);
            setSnackbarMessage(error.response.data);
            setOpenSnackbar(true);
        }
    };

    const handleOptionSelect = (event) => {
        console.log(event.target.value);
        setSelectedOption(event.target.value);
    };

    return (
        <CustomContainer>
            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                <Typography component="h1" variant="h5" align="center" sx={{ marginBottom: 2, fontWeight: 'bold', 
                        fontFamily: 'Arial', color: '#EE6D72' }}>
                    {t("textoPersonalizar")}
                </Typography>
                <TextField
                    width='30vh'
                    name="questions"
                    margin="normal"
                    label={t("textoNumPreg")}
                    placeholder={t("textoPlaceholderNumPreg")}
                    onChange={handleChangeQuestions}
                    value={valueQuestion}
                    type="number"
                    step="1"
                    sx={{ 
                        width: '30vh',
                        marginTop: 3,
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
                width='50vh'
                label={t("textoTiempoPreg")}
                placeholder={t("textoPlaceholderTiempoPreg")}
                onChange={handleChangeTime}
                value={valueTime}
                type="number"
                step="1"
                sx={{
                    width: '30vh',
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
                inputProps={{
                    inputMode: 'numeric',
                    min: 0,
                    max: 60,
                }}
            />
            <Typography component="p" variant="p" align="center" sx={{ marginBottom: 2, fontWeight: 'bold', 
                fontFamily: 'Arial', color: '#EE6D72' }}>
                {t("textoTematicas")}
            </Typography>
            <FormControl fullWidth sx={{ 
                        width: '30vh',
                        marginBottom: 2, 
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
                    }}> 
                <InputLabel id="themes">{t("tematicas")}</InputLabel>
                <Select
                    defaultValue="Todas"
                    onChange={handleOptionSelect}
                    label="Temáticas"
                    labelId="themes"
                >
                    <MenuItem value="Todas">{t("tematicaTodas")}</MenuItem>
                    <MenuItem value="Geografia">{t("tematicaGeo")}</MenuItem>
                    <MenuItem value="Cultura">{t("tematicaCult")}</MenuItem>
                    <MenuItem value="Informatica">{t("tematicaInf")}</MenuItem>
                    <MenuItem value="Personajes">{t("tematicaPersonajes")}</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" sx={{marginTop: 4,marginBottom: 4, backgroundColor: '#f8b6bc',  color: '#413C3C',  fontWeight: 'bold',  transition: 'transform 0.3s ease',
                '&:hover': {
                    backgroundColor: '#f8b6bc',
                    transform: 'scale(1.1)'
                }}}
                onClick={configureAndStart}>
                {t("botonJugar")}
            </Button>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} message={snackbarMessage} />
            {error && (
                <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')} message={`Error: ${error}`} />
            )}
            </div>
        </CustomContainer>
);
};

export default GameConfiguration;
