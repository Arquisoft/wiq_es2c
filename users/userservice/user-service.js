// user-service.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const User = require('./user-model')

const app = express();
app.disable('x-powered-by');
const port = 8001;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Connect to MongoDB
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
mongoose.connect(mongoUri);

// Function to validate required fields in the request body
function validateRequiredFields(req, requiredFields) {
    for (const field of requiredFields) {
      if (!(field in req.body)) {
        throw new Error(`Missing required field: ${field}`);
      }
    }
}

function validateRequiredFieldsContent(username,email,password){
    if(username.trim().length === 0 || email.trim().length === 0 || password.trim().length === 0 ){
        throw new Error(`Los campos no pueden estar vacíos`);
    }else{

        const regex = /@gmail\.com$/;
        if(!regex.test(email)){
            throw new Error(`El email debe acabar con @gmail.com`);
        }else{

            if(password.trim().length < 8){
                throw new Error(`La contraseña debe tener al menos 8 caracteres`);
            }

        }
    }
}

app.post('/adduser', async (req, res) => {
    try {
        // Check if required fields are present in the request body
        validateRequiredFields(req, ['username', 'email','password']);
        validateRequiredFieldsContent(req.body.username,req.body.email,req.body.password);
        const { username,email, password } = req.body;
        const user_Username = await findOne(username, null);
        const user_Email = await findOne(null, email);
        if(user_Email || user_Username ){
            throw new Error("Ya se ha registrado un usuario con ese email o nombre de usuario");
        }else{
            // Encrypt the password before saving it
            const hashedPassword = await bcrypt.hash(req.body.password, 10);

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
            });

            await newUser.save();
            res.json(newUser);
        }

    } catch (error) {
      console.log("Error: " + error)
      res.status(400).json({ error: error.message }); 
    }});

const server = app.listen(port, () => {
  console.log(`User Service listening at http://localhost:${port}`);
});

// Listen for the 'close' event on the Express.js server
server.on('close', () => {
    // Close the Mongoose connection
    mongoose.connection.close();
});

async function findOne(username, email) {
    const query = {};
    if (username) {
        query.username = username.toString();
    }
    if (email) {
        query.email = email.toString();
    }
    return await User.findOne(query);
}

module.exports = server