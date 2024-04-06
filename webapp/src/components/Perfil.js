import axios from 'axios';
import React, { useState} from 'react';
import { useNavigate} from 'react-router-dom';
import { Container, Button} from '@mui/material';

const Perfil = () => {

    const navigate = useNavigate();
    const apiEndpoint = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8000';

    const [user, setUser] = useState([]);

    const handleShowUser = async () => {
        try{
            // It makes a petition to the api and store the response
            const response = await axios.get(`${apiEndpoint}/getUser`, { });
            console.log(response)
            setUser(response.data);
        }catch (error){
            console.error('Error:', error);
        }    
    }

    const handlePreviousPage = async () => {
        navigate('/PantallaInicio'); 
    }

    return (
        
        <Container component="main" maxWidth="xs" sx={{ marginTop: 4 }}>
        
        <div>
            <Button variant="contained" color="primary" onClick={handlePreviousPage}> 
                Página anterior
            </Button>

            <Button variant="contained" color="primary" onClick={handleShowUser}> 
                Cargar perfil
            </Button>
        </div>
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Usuario</th>
                        <th>Creado en </th>
                    </tr>
                </thead>
                <tbody>
                    {user.map((row, rowIndex) => (
                    <tr key={rowIndex}>
                        {row.map((cell, cellIndex) => (
                            <td key={cellIndex}>{cell}</td>
                        ))}
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    </Container>

    );
};

export default Perfil;