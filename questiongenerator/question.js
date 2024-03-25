const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Question = require('./question-model');
const { queries:textQueries, questions:textQuestions } = require('./text_questions');
const { queries:imagesQueries, questions:imagesQuestions } = require('./image_questions');

const app = express();
const port = 8003;


// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Necesario para poder hacer las peticiones desde Game
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', process.env.REACT_APP_API_GENERATOR_ENDPOINT);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

var queries = [];
queries = queries.concat(textQueries);
queries = queries.concat(imagesQueries);
console.log(queries.length);
var questions = [];
questions = questions.concat(textQuestions);
questions = questions.concat(imagesQuestions);

var correctOption = "";
var options = [];
var question = "";
var image = "";
var url = 'https://query.wikidata.org/sparql';
var questionToSave = null;

//  Número aleatorio que decide la consulta y la pregunta que se mostrarán
var randomNumber;

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';
mongoose.connect(mongoUri);

app.get('/generateQuestion', async (req, res) => {
    try {
        await generarPregunta();
        var id = saveData();

        // Construcción de la respuesta
        var response = {
            responseQuestion: question,
            responseOptions: options,
            responseCorrectOption: correctOption,
            responseImage: image,
            question_Id: id
        };

        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }});

var server = app.listen(port, () => {
  console.log(`Questions Generation Service listening at http://localhost:${port}`);
});

async function generarPregunta() {
    randomNumber = Math.floor(Math.random() * 2);
    try {
        // Petición a la API de WikiData
        randomNumber = Math.floor(Math.random() * queries.length);
        var response = await axios.get(url, {
            params: {
                query: queries[randomNumber],
                format: 'json'
            },
            headers: {
                'Accept': 'application/sparql-results+json'
            }
        });

        procesarDatos(response.data);


    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        throw new Error('Error al obtener datos ' + error);
    }
}

function procesarDatos(data) {
    // Hay que eliminar todos los elementos de options para que no se acumulen
    options = [];
    var data = data.results.bindings;
    var randomIndexes = [];

    // Obtenemos cuatro índices aleatorios sin repetición
    while (randomIndexes.length < 4) {
        var randomIndex = Math.floor(Math.random() * data.length);
        var option = data[randomIndex].optionLabel.value;
        var quest = "";

        // Si es una pregunta de texto hay que coger la parte de la pregunta que falta; si es una pregunta de imagen
        // la pregunta ya viene en el array
        if('questionLabel' in data[randomIndex]) {
            quest = data[randomIndex].questionLabel.value;
        }

        // Comprobamos que tanto la opción como la pregunta no sean entidades de WikiData ni enlaces o que la pregunta ya 
        // venga en el array (estara vacia)
        if (!randomIndexes.includes(randomIndex) && (quest == ""
            || (!(option.startsWith("Q") || option.startsWith("http"))
                && !(quest.startsWith("Q") || quest.startsWith("http"))
                )
            )) {
            randomIndexes.push(randomIndex);
        }
    }

    // Escogemos un índice aleatorio como la opción correcta
    var correctIndex = Math.floor(Math.random() * 4);
    correctOption = data[randomIndexes[correctIndex]].optionLabel.value;

    if(quest == "") {
        question = questions[randomNumber];
        image = data[randomIndexes[correctIndex]].imageLabel.value;
    } else {
        image = "";
        questionValue = data[randomIndexes[correctIndex]].questionLabel.value;
        question = questions[randomNumber] + questionValue + "?";
    }


    // Varriamos las opciones, incluyendo la correcta
    for (let i = 0; i < 4; i++) {
        var optionIndex = randomIndexes[i];
        options.push(data[optionIndex].optionLabel.value);
    }
}

async function saveData(){
    try {

        var false_options = options.filter(o => o != correctOption);

        const newQuestion = new Question({
            enunciado: question,
            respuesta_correcta: correctOption,
            respuesta_falsa1: false_options[0],
            respuesta_falsa2: false_options[1],
            respuesta_falsa3: false_options[2]
        });

       await newQuestion.save();
        questionToSave = newQuestion;
        return newQuestion._id;
    }catch (error){
        console.error("Error al guardar la pregunta: " + error);
    }
}

app.get('/updateQuestion', async (req, res) => {
    try {
        const questionId = questionToSave._id;
        const newTime = req.query.time;
        const updatedQuestion = await Question.findByIdAndUpdate(questionId,{time: newTime},{new:true});

        if (!updatedQuestion) {
            return res.status(404).json({ error: "La pregunta no fue encontrada" });
        }
        res.status(200).json({ message: "Tiempo de pregunta actualizado exitosamente", updatedQuestion });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});


module.exports = server