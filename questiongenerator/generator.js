const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const Question = require('./Question');

const app = express();
const port = 8003;

app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);

let preguntaActual = null; 

// Ruta para el endpoint questiongenerator
app.get('/question', async (req, res) => {
    try {
        const pregunta = new Question();
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


// Start the server
const server = app.listen(port, () => {
    console.log(`Auth Service listening at http://localhost:${port}`);
  });
  
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
});

module.exports = server
  
  