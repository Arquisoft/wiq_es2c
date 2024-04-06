const express = require('express');
const mongoose = require('mongoose');
const User = require('./user-model')
//import { useUser } from '../webapp/src/components/UserContext';

const app = express();
const port = 8004;

//const { usernameGlobal  } = useUser();

app.use(express.json());

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);


app.get('/getUser', async (req, res) => {
    console.log('ENTRA A USERSAPIiiii')
    const users = await User.find({}); // Busca un usuario con el nombre de usuario especificado
    console.log('ENTRA A USERSAPI')
    if (!users) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    var solution = [];
    users.forEach(row => {
        solution.push([row.username,row.createdAt]);
    });

    res.status(200).json(solution);
});

const server = app.listen(port, () => {
    console.log(`Creation Service listening at http://localhost:${port}`);
});

server.on('close', () => {
    mongoose.connection.close();
});

module.exports = server;