import { Container, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import '../App.css';


const PantallaInicio = () => {

    const [t] = useTranslation("global");

    const navigate = useNavigate();


    const showAllUsers = () => {
        navigate("/AllUsers")
    };

    const showAllQuestions = () => {
        navigate("/AllQuestions")
    };


    return (
        <Container component="main" maxWidth="xxl"
            sx={{
                backgroundColor: '#F3D3FA',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh', 
                width: '100%', 
            }}> 

            <Box sx={{
                display: 'flex',
                flexDirection: 'column', // Alinea los elementos verticalmente
                justifyContent: 'center', // Centra horizontalmente
                alignItems: 'center'
            }}>
                <Button variant="contained" color="primary" sx={{marginTop: 4,marginBottom: 4, backgroundColor: '#FCF5B8',  color: '#413C3C',  fontWeight: 'bold' }} onClick={showAllUsers}>
                    {t("botonUsuarios")}
                </Button>
                <Button variant="contained" color="primary" sx={{marginTop: 4,marginBottom: 4, backgroundColor: '#FCF5B8',  color: '#413C3C',  fontWeight: 'bold' }} onClick={showAllQuestions}>
                    {t("botonPreguntas")}
                </Button>
            </Box>

        </Container>
    );
};

export default PantallaInicio;