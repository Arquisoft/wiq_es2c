const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const GameHistory = require('./gamehistory-model.js');

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';
mongoose.connect(mongoUri);

const originEndpoint = process.env.REACT_APP_API_ORIGIN_ENDPOINT || 'http://localhost:3000';

const app = express();
const port = 8004;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', originEndpoint);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.post("/saveGameHistory", async (req, res) => {
    try {
        const { username } = req.body;
        await saveGameHistory(username);
        res.status(200).json({ success: true });
    } catch (error) { 
      res.status(400).json({ error: "Error al guardar el historial del juego: "+ error.message });
    }
});

app.get("/gamehistory", async (req, res) => {
    try {

        var gamehistory = await GameHistory.findOne({ userId:req.query.username});
    
        if (gamehistory) {
            var response = {
                userId: gamehistory.userId,
                totalGamesPlayed: gamehistory.totalGamesPlayed,
                totalQuestionsAnswered: gamehistory.totalQuestionsAnswered,
                totalRightQuestions: gamehistory.totalRightQuestions,
                totalIncorrectQuestions: gamehistory.totalIncorrectQuestions,
                ratio: gamehistory.ratio + " %",
                totalTime: gamehistory.totalTime + " s"
            };
            res.json(response);
        } else {
            var response = {
                userId: gamehistory.userId,
                totalGamesPlayed: 0,
                totalQuestionsAnswered: 0,
                totalRightQuestions: 0,
                totalIncorrectQuestions: 0,
                ratio: 0,
                totalTime: 0
            };
            res.json(response);
        }

    } catch (error) { }
});

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

        const games = await mongoose.connection.collection('games').aggregate([
            { 
                $match: { userId: userId } 
            },
            {
                $lookup: {
                    from: 'questions',
                    localField: 'questions',
                    foreignField: '_id',
                    as: 'questionsData'
                }
            }
        ]).toArray();
        
        const totalGamesPlayed = games.length;
        let totalRightQuestions = 0;
        let totalIncorrectQuestions = 0;
        let totalTime = 0;
        
        games.forEach(game => {
            totalRightQuestions += game.questionsData.filter(question => question.correct).length;
            totalIncorrectQuestions += game.questionsData.filter(question => !question.correct).length;
            totalTime += game.questionsData.reduce((acc, curr) => acc + (curr.time ?? 0), 0);
        });

        // Actualiza los campos del historial de juego
        gameHistory.totalGamesPlayed = totalGamesPlayed;
        gameHistory.totalQuestionsAnswered = totalRightQuestions + totalIncorrectQuestions;
        gameHistory.totalRightQuestions = totalRightQuestions;
        gameHistory.totalIncorrectQuestions = totalIncorrectQuestions;
        gameHistory.ratio =  parseInt((totalRightQuestions / (totalRightQuestions + totalIncorrectQuestions))*100);
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