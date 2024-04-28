
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
                <Typography component="h1" variant="h6" align="center" sx={{ marginBottom: 4, fontWeight: 'bold' }}>
                    {t("textoInicio")} {usernameGlobal}!
                </Typography>

                <Button startIcon={<NewGameIcon />} variant="contained" color="primary" align="center" sx={{ marginTop: 4, backgroundColor: '#FCF5B8',  color: '#413C3C',  fontWeight: 'bold' }}
                    onClick={nuevaPartida}>
                    {t("botonPartida")}
                </Button>
            </Box>
        </CustomContainer>
        
    );
};

export default PantallaInicio;