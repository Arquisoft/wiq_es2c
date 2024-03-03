const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8003;

// Middleware to parse JSON in request body
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

const alreadyExecuted = false;
const correctOption = "";
const options = [];
const question = "";
const url = 'https://query.wikidata.org/sparql';
const sparqlQuery = `
SELECT ?country ?countryLabel ?capital ?capitalLabel
WHERE {
    ?country wdt:P31 wd:Q6256; wdt:P36 ?capital.
    SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
}
`;

app.post('/generateQuestion', async (req, res) => {
    try {
        await generarPregunta();

        const response = {
            responseQuestion: question,
            responseOptions: options,
            responseCorrectOption: correctOption
        };
        
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({ error: error.message }); 
    }});

const server = app.listen(port, () => {
  console.log(`Questions Generation Service listening at http://localhost:${port}`);
});

async function generarPregunta() {
    try {
        const response = await axios.get(url, {
            params: {
                query: sparqlQuery,
                format: 'json'
            }
        });

        if(!alreadyExecuted) {
            procesarDatos(response.data);
            alreadyExecuted = true;
        }

    } catch (error) {
        console.error('Error al realizar la solicitud:', error);
        throw new Error('Error al obtener datos');
    }
}

function procesarDatos(data) {
    const countries = data.results.bindings;
    const randomIndexes = [];

    // Obtenemos cuatro índices aleatorios sin repetición
    while (randomIndexes.length < 4) {
        const randomIndex = Math.floor(Math.random() * countries.length);
        if (!randomIndexes.includes(randomIndex)) {
            randomIndexes.push(randomIndex);
        }
    }

    // Escogemos un índice aleatorio como la opción correcta
    const correctIndex = Math.floor(Math.random() * 4);
    correctOption = countries[randomIndexes[correctIndex]].countryLabel.value;
    question = `¿Cuál es la capital de ${correctOption}?`;

    // Construimos las opciones, incluyendo la correcta
    for (let i = 0; i < 4; i++) {
        const optionIndex = randomIndexes[i];
        options.push(countries[optionIndex].capitalLabel.value);
    }
}

module.exports = server