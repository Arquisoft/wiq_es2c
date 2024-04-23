const axios = require('axios');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Question = require('./question-model');
const Game = require('./game-model');
const { queries:textQueries } = require('./text_questions');
const { queries:imagesQueries } = require('./image_questions');

const generatorEndpoint = process.env.REACT_APP_API_ORIGIN_ENDPOINT || 'http://localhost:3000';

const app = express();
const port = 8003;

var language = 'undefined';

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Necesario para poder hacer las peticiones desde Game
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', generatorEndpoint);
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Consultas generales
var generalQueries = getQueriesAndQuestions(textQueries, imagesQueries);

// Consultas concretas
var queries = [];

var correctOption = "";
var options = [];
var question = "";
var image = "";
var url = 'https://query.wikidata.org/sparql';
var questionToSave = null;
var gameId = null;
var numberOfQuestions = 0;

//  Número aleatorio que decide la consulta y la pregunta que se mostrarán
var randomNumber;

var maxQuestions = 5;

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/questiondb';
mongoose.connect(mongoUri);

function getQueriesAndQuestions(textData, imageData) {
    let mergedQueries = {};

    // Combinar las consultas del primer archivo
    for (let language in textData) {
        let thematicQueries1 = textData[language];
        for (let thematic in thematicQueries1) {
            if (!mergedQueries[thematic]) {
                mergedQueries[thematic] = {};
            }
            if (!mergedQueries[thematic][language]) {
                mergedQueries[thematic][language] = [];
            }
            mergedQueries[thematic][language] = mergedQueries[thematic][language].concat(thematicQueries1[thematic]);
        }
    }
    // Combinar las consultas del segundo archivo
    for (let language in imageData) {
        let thematicQueries2 = imageData[language];
        for (let thematic in thematicQueries2) {
            if (!mergedQueries[thematic]) {
                mergedQueries[thematic] = {};
            }
            if (!mergedQueries[thematic][language]) {
                mergedQueries[thematic][language] = [];
            }
            mergedQueries[thematic][language] = mergedQueries[thematic][language].concat(thematicQueries2[thematic]);
        }
    }
    return mergedQueries;
}

app.get('/generateQuestion', async (req, res) => {
    try {
        language = req.query.language;
        queries = [];
        questions = [];
        if(numberOfQuestions == 0){
            gameId = null;
        }
        const user = req.query.user;
        await getQueriesByThematic(req.query.thematic);
        await generarPregunta();
        numberOfQuestions++;
        if(numberOfQuestions>=maxQuestions){
            numberOfQuestions = 0;
        }
        var id = await saveData();
        await saveGame(user, id);
        
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
    }
});

app.post('/configureGame', async (req, res) => {
    try {
        maxQuestions = req.body.valueQuestion;
        if(maxQuestions === undefined) {
            throw new Error("Número de preguntas incorrecta");
        }
        res.status(200).json(maxQuestions);
    } catch (error) {
        console.log("Error: " + error)
        res.status(400).json({ error: error.message });
    }
});

var server = app.listen(port, () => {
  console.log(`Questions Generation Service listening at http://localhost:${port}`);
});

async function getQueriesByThematic(thematic) {
    if(thematic == "Geografia") {
        changeQueriesAndQuestions("Geografia");
    } else if(thematic == "Cultura") {
        changeQueriesAndQuestions("Cultura");
    } else if(thematic == "Informatica") {
        changeQueriesAndQuestions("Informatica");
    } else if(thematic == "Personajes") {
        changeQueriesAndQuestions("Personajes");
    } else {
        queries = getAllValues();
    }
}

function changeQueriesAndQuestions(thematic) {
    queries = generalQueries[thematic];
    queries = queries[language];
}

function getAllValues() {
    let results = [];
    for (let thematic in generalQueries) {
        let thematicQueries = generalQueries[thematic];
        if (thematicQueries[language]) {
            results = results.concat(thematicQueries[language]);
        }
    }
    return results;
}


async function generarPregunta() {
    randomNumber = Math.floor(Math.random() * 2);
    try {
        // Petición a la API de WikiData
        randomNumber = Math.floor(Math.random() * queries.length);
        var response = await axios.get(url, {
            params: {
                query: queries[randomNumber][0],
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

    // Mantenemos a los options que ya se han seleccionado para que no se repitan
    var optionsSelected = [];

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
                ) 
            && !optionsSelected.includes(option)) {
            randomIndexes.push(randomIndex);
            optionsSelected.push(option);
        }
    }

    // Escogemos un índice aleatorio como la opción correcta
    var correctIndex = Math.floor(Math.random() * 4);
    correctOption = data[randomIndexes[correctIndex]].optionLabel.value;

    if(quest == "") {
        question = queries[randomNumber][1];
        image = data[randomIndexes[correctIndex]].imageLabel.value;
    } else {
        image = "";
        questionValue = data[randomIndexes[correctIndex]].questionLabel.value;
        question = queries[randomNumber][1] + questionValue + "?";
    }


    // Varriamos las opciones, incluyendo la correcta
    for (let i = 0; i < 4; i++) {
        let optionIndex = randomIndexes[i];
        let option = data[optionIndex].optionLabel.value;
        options.push(option);
    }
}

async function saveGame(username,id) {

    if (gameId === null) {

        try {
            const newGame = new Game({userId: username, questions: []});
            newGame.questions.push(questionToSave._id);
            await newGame.save();
            gameId = newGame._id;
            return null;
        } catch (error) {
            console.error("Error al guardar datos de la partida: " + error);
        }
    } else {
        const existingGame = await Game.findById(gameId);

        if (!existingGame) {

            try {
                const newGame = new Game({userId: username, questions: []});
                newGame.questions.push(questionToSave._id);
                await newGame.save();
                gameId = newGame._id;
                return null;
            } catch (error) {
                console.error("Error al guardar datos de la partida: " + error);
            }

        } else {
            try {
                existingGame.questions.push(questionToSave._id);
                await existingGame.save();
                gameId = existingGame._id;
                return null;
            } catch (error) {
                console.error("Error al guardar datos de la partida: " + error);
            }

        }
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
        const isTheCorrectAnswer = req.query.correct;
        const updatedQuestion = await Question.findByIdAndUpdate(questionId,{time: newTime, correct: isTheCorrectAnswer},{new:true});

        if (!updatedQuestion) {
            return res.status(404).json({ error: "La pregunta no fue encontrada" });
        }
        res.status(200).json({ message: "Tiempo de pregunta actualizado exitosamente", updatedQuestion });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/restartGame', async (req,res) => {
    try{
        numberOfQuestions = 0;
        res.status(200).json({ message: "Número de preguntas actualizado", numberOfQuestions });
    }catch (error){
        res.status(400).json({ error: error.message });
    }

});


module.exports = server