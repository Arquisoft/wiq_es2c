const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const promBundle = require('express-prom-bundle');
const User = require('./user-model')

const app = express();
app.disable('x-powered-by');
const port = 8006;

//Prometheus configuration
const metricsMiddleware = promBundle({includeMethod: true});
app.use(metricsMiddleware);

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


app.get('/getAllUsers', async (req, res) => {
    try{

        

        var users = await User.find();
        var userList = [];
        
        users.forEach(user => {
            userList.push({
                username: user.username,
                email: user.email,
                creado: user.createdAt
            });
        });

        // Devolver la lista completa de usuarios
        res.json(userList);
        

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