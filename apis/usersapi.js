const express = require('express');
const mongoose = require('mongoose');
const User = require('./user-model')

const app = express();
const port = 8005;

app.use(express.json());

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);


app.get('/getUser', async (req, res) => {
    try{

        var user = await User.findOne({ username:req.query.username});

        var response = {
            username: user.username,
            email: user.email,
            creado: user.createdAt
        };
        res.json(response);

    } catch (error) {
        console.error('Error al buscar el usuario:', error);
        res.status(500).json({ message: 'Error interno del servidor' });
    }
});

const server = app.listen(port, () => {
    console.log(`Creation Service listening at http://localhost:${port}`);
});

server.on('close', () => {
    mongoose.connection.close();
});

module.exports = server;