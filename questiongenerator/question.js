const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8003;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

// Necesario para poder hacer las peticiones desde Game
// http://localhost:3000 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://20.254.64.59:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

var correctOption = "";
var options = [];
var question = "";
var url = 'https://query.wikidata.org/sparql';
// Todas las consultas
var queries = [`SELECT ?question ?questionLabel ?option ?optionLabel
    WHERE {
        ?question wdt:P31 wd:Q6256; wdt:P36 ?option.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
    }
    `,`
    SELECT ?question ?questionLabel ?option ?optionLabel
    WHERE {
        ?question wdt:P31 wd:Q476028.
        ?question wdt:P115 ?option. 
        ?question wdt:P17 wd:Q29.
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
    }
    `,`
    SELECT ?option ?optionLabel ?questionLabel (SUBSTR(?símbolo, 1, 1) AS ?sym)
    WHERE {
    ?option wdt:P31 wd:Q11344;        
                wdt:P1086 ?questionLabel.        
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE], es". }
    }
    `];
// Todas las preguntas, en el mismo orden que las consultas
var questions = ["¿Cuál es la capital de ",
                "¿En que campo juega el ",
                "¿Cual es el elemento de la tabla periódica número "];
//  Número aleatorio que decide la consulta y la pregunta que se mostrarán
var randomNumber;

app.get('/generateQuestion', async (req, res) => {
    try {
        await generarPregunta();

        // Construcción de la respuesta
        var response = {
            responseQuestion: question,
            responseOptions: options,
            responseCorrectOption: correctOption
        };
        
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }});

var server = app.listen(port, () => {
  console.log(`Questions Generation Service listening at http://localhost:${port}`);
});

async function generarPregunta() {
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
        var quest = data[randomIndex].questionLabel.value;

        // Comprobamos que tanto la opción como la pregunta no sean entidades de WikiData ni enlaces
        if (!randomIndexes.includes(randomIndex)
            && !(option.startsWith("Q") || option.startsWith("http"))
            && !(quest.startsWith("Q") || quest.startsWith("http"))) {
            randomIndexes.push(randomIndex);
        }
    }

    // Escogemos un índice aleatorio como la opción correcta
    var correctIndex = Math.floor(Math.random() * 4);
    correctOption = data[randomIndexes[correctIndex]].optionLabel.value;
    questionValue = data[randomIndexes[correctIndex]].questionLabel.value;
    question = questions[randomNumber] + questionValue + "?";

    // Varriamos las opciones, incluyendo la correcta
    for (let i = 0; i < 4; i++) {
        var optionIndex = randomIndexes[i];
        options.push(data[optionIndex].optionLabel.value);
    }
}

module.exports = server
