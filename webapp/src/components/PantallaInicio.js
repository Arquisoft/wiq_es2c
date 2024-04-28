
import { Typography, Button, Box } from '@mui/material';
import { useUser } from './UserContext';
import { useNavigate } from 'react-router-dom';
import NewGameIcon from '@mui/icons-material/SportsEsports';
import '../App.css';
import { useTranslation } from 'react-i18next';
import { CustomContainer } from '../CustomContainer';



const PantallaInicio = () => {

    const [t] = useTranslation("global");
    const { usernameGlobal} = useUser();

    const navigate = useNavigate();

    function nuevaPartida() {
        navigate("/GameConfiguration");
    }

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

                <Button startIcon={<NewGameIcon />} variant="contained" color="primary" align="center" sx={{marginTop: 4,marginBottom: 4, backgroundColor: '#f8b6bc',  color: '#413C3C',  fontWeight: 'bold',  transition: 'transform 0.3s ease',
                '&:hover': {
                    backgroundColor: '#f8b6bc',
                    transform: 'scale(1.1)'
                }}}
                    onClick={nuevaPartida}>
                    {t("botonPartida")}
                </Button>
            </Box>
        </CustomContainer>
        
    );
};

export default PantallaInicio;