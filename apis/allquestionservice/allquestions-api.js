const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 8007;

const originEndpoint = process.env.REACT_APP_API_ORIGIN_ENDPOINT || 'http://localhost:3000';

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);

// Middleware to parse JSON in request body
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', originEndpoint);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});


app.get('/getAllQuestions', async (req, res) => {
    try{

        var questions = await mongoose.connection.collection('questions').find().toArray();

        var questionsList = [];
        
        questions.forEach(q => {
            questionsList.push({
                enunciado: q.enunciado,
                respuesta_correcta: q.respuesta_correcta
            });
        });

        // Devolver la lista completa de usuarios
        res.json(questionsList);
        

    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }
});

const server = app.listen(port, () => {
    console.log(`Creation Service listening at http://localhost:${port}`);
});

server.on('close', () => {
    mongoose.connection.close();
});

module.exports = server;