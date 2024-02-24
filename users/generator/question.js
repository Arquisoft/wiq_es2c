const axios = require('axios');

class Question {
    constructor() {
        this.correctOption = "";
        this.options = [];
        this.question = "";
        this.url = 'https://query.wikidata.org/sparql';
        this.sparqlQuery = `
        SELECT ?country ?countryLabel ?capital ?capitalLabel
        WHERE {
            ?country wdt:P31 wd:Q6256; wdt:P36 ?capital.
            SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }
        }
        `;
    }

    async generarPregunta() {
        try {
            const response = await axios.get(this.url, {
                params: {
                    query: this.sparqlQuery,
                    format: 'json'
                }
            });
            this.procesarDatos(response.data);
        } catch (error) {
            console.error('Error al realizar la solicitud:', error);
            throw new Error('Error al obtener datos');
        }
    }

    procesarDatos(data) {
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
        this.correctOption = countries[randomIndexes[correctIndex]].countryLabel.value;
        this.question = `¿Cuál es la capital de ${this.correctOption}?`;

        // Construimos las opciones, incluyendo la correcta
        for (let i = 0; i < 4; i++) {
            const optionIndex = randomIndexes[i];
            this.options.push(countries[optionIndex].capitalLabel.value);
        }
    }
}

module.exports = Question;