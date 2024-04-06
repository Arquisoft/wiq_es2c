const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const GameHistory = require('./gamehistory-model.js');
const Game = require('./questiongenerator/game-model.js');

const app = express();
const port = 8004;


// Middleware to parse JSON in request body
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_APP_API_GENERATOR_ENDPOINT);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post("/saveGameHistory", async (req, res) => {
    try {
        
      await saveGameHistory(req.query.username);
  
    } catch (error) { 
      res.status(400).json({ error: "Error al guardar el historial del juego: "+ error.message });
    }
  });

app.get("/gamehistory", async (req, res) => {
    try {
      var data = await getGameHistory(req.query.username);
  
      res.json(data);
  
    } catch (error) { 
      res.status(400).json({ error: "Error al guardar el historial del juego: "+ error.message });
    }
  });

  async function getGameHistory(userId){
    try {
        var gamehistory = await GameHistory.findOne({ userId:userId});

        if (gamehistory) {
            return {
                userId: gamehistory.userId,
                totalGamesPlayed: gamehistory.totalGamesPlayed,
                totalRightQuestions: gamehistory.totalRightQuestions,
                totalIncorrectQuestions: gamehistory.totalIncorrectQuestions,
                ratio: gamehistory.ratio,
                totalTime: gamehistory.totalTime
            };
        } else {
            return null; 
        }
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        throw error;
    }
}


async function saveGameHistory(userId) {
    try {

        // Busca el historial de juego existente del usuario
        let gameHistory = await GameHistory.findOne({ userId: userId });

        // Si no existe un historial de juego, crea uno nuevo
        if (!gameHistory) {
            gameHistory = new GameHistory({
                userId: userId
            });
        }

        // Obtiene los datos del juego del usuario
        const games = await Game.find({ userId: userId });

        const totalGamesPlayed = games.length;
        let totalRightQuestions = 0;
        let totalIncorrectQuestions = 0;
        let totalTime = 0;

        // Calcula los totales de preguntas correctas, incorrectas y el tiempo total
        games.forEach(game => {
            totalRightQuestions += game.questions.filter(question => question.correct).length;
            totalIncorrectQuestions += game.questions.filter(question => !question.correct).length;
            totalTime += game.questions.reduce((acc, curr) => acc + curr.time, 0);
        });

        // Actualiza los campos del historial de juego
        gameHistory.totalGamesPlayed = totalGamesPlayed;
        gameHistory.totalRightQuestions = totalRightQuestions;
        gameHistory.totalIncorrectQuestions = totalIncorrectQuestions;
        gameHistory.ratio = totalRightQuestions / (totalRightQuestions + totalIncorrectQuestions);
        gameHistory.totalTime = totalTime;

        // Guarda el historial del juego en la base de datos
        await gameHistory.save();

        console.log('Historial del juego guardado exitosamente.');
    } catch (error) {
        console.error('Error al guardar el historial del juego:', error);
        throw error;
    }
}


const server = app.listen(port, () => {
console.log(`Stats Service listening at http://localhost:${port}`);
});

server.on('close', () => {
// Close the Mongoose connection
mongoose.connection.close();
});

module.exports = server;