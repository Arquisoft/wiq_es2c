import { Container, Typography, TextField, Button, Snackbar } from '@mui/material';

const PantallaInicio = () => {
    const [error, setError] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    return (
        <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
        <Button variant="contained" color="#FCF5B8">
            NUEVA PARTIDA
        </Button>
        </Container>
    );
};

export default PantallaInicio;