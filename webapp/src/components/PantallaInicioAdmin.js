import { Button, Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../App.css';
import { CustomContainer } from '../CustomContainer';
import { useUser } from './UserContext';



const PantallaInicio = () => {

    const [t] = useTranslation("global");

    const navigate = useNavigate();
    const { usernameGlobal} = useUser();


    const showAllUsers = () => {
        navigate("/AllUsers")
    };

    const showAllQuestions = () => {
        navigate("/AllQuestions")
    };


    return (
        <CustomContainer> 

            <Box sx={{
                display: 'flex',
                flexDirection: 'column', // Alinea los elementos verticalmente
                justifyContent: 'center', // Centra horizontalmente
                alignItems: 'center'
            }}>
                <Typography component="h1" variant="h4" align="center" sx={{ marginBottom: 2, fontWeight: 'bold', 
                    fontFamily: 'Arial', color: '#EE6D72' }}>
                    {t("textoInicio")} {usernameGlobal}!
                </Typography>

                <Button variant="contained" color="primary" sx={{marginTop: 4,marginBottom: 4, backgroundColor: '#EE6D72',  color: '#FFFFFF',  fontWeight: 'bold',  transition: 'transform 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f8b6bc',
                  transform: 'scale(1.1)'
                }}} onClick={showAllUsers}>
                    {t("botonUsuarios")}
                </Button>
                <Button variant="contained" color="primary" sx={{marginTop: 4,marginBottom: 4, backgroundColor: '#EE6D72',  color: '#FFFFFF',  fontWeight: 'bold',  transition: 'transform 0.3s ease',
                '&:hover': {
                  backgroundColor: '#f8b6bc',
                  transform: 'scale(1.1)'
                }}} onClick={showAllQuestions}>
                    {t("botonPreguntas")}
                </Button>
            </Box>

        </CustomContainer>
    );
};

export default PantallaInicio;