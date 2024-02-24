const express = require('express');
const bodyParser = require('body-parser');
const Pregunta = require('./Pregunta');

const app = express();
const port = 8002;

app.use(bodyParser.json());

let preguntaActual = null; 

// Ruta para el endpoint questiongenerator
app.get('/question', async (req, res) => {
    try {
        const pregunta = new Pregunta();
        await pregunta.generarPregunta();
        
        // Almacenamos la pregunta generada para accederla posteriormente
        preguntaActual = pregunta;

        // Enviamos la pregunta y las opciones al cliente
        res.json({
            question: pregunta.question,
            options: pregunta.options
        });
    } catch (error) {
        console.error('Error al generar la pregunta:', error);
        res.status(500).json({ error: 'Error al generar la pregunta' });
    }
});

// Ruta para manejar las respuestas de los usuarios
app.post('/answer', (req, res) => {
    const { answer } = req.body;

    if (!preguntaActual) {
        return res.status(400).json({ error: 'No hay pregunta actual para responder' });
    }

    
    res.json({ message: 'Respuesta recibida exitosamente' });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});