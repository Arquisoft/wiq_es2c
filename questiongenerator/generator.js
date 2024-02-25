import {useEffect, useState} from 'React';

const WikiDataService = () =>{

    const [questionData, setQuestionData] = useState(null);

    useEffect(() => {

        const fecthQuestionData = async () => {

            try{

                const query = 'SELECT ?country ?countryLabel ?capital ?capitalLabel ' +
                    'WHERE {' +
                    '?country wdt:P31 wd:Q6256. ' +
                             'wdt:P36 ?capital.' +
                    'SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],es". }' +
                    '}';

                const api='https://query.wikidata.org/sparql';

                const response = await fetch(`${api}?query=~{encodeURIComponent(query)}&format=json`)

                if (!response.ok) {
                    throw new Error('Error al realizar la solicitud');
                }

                const data = await response.json();

            }catch(error){
                console.error('Error al realizar la solicitud:', error);
            }

        };

        const processData = (data) => {

            const countries = data.result.bindings;
            const randomCountries = [];
            const capitals = [];

            for(var i=0; i<4; i++) {
                var pos = Math.floor(Math.random() * teams.length);
                var teamLabel = teams[pos].teamLabel.value;
                var fieldLabel = teams[pos].fieldLabel.value;

                if((!randomTeams.includes(teamLabel) && !teamsFields.includes(fieldLabel))
                    && !teamLabel.startsWith("Q") && !(fieldLabel.startsWith("Q") || fieldLabel.startsWith("http") )) {
                    randomTeams.push(teamLabel);
                    teamsFields.push(fieldLabel);
                } else {
                    i--;
                }
            }

            var num = Math.floor(Math.random() * 4);
            var country = randomCountries[num];
            var capital = capitals[num];

            setQuestionData({

                question: `¿Cuál es la capital de ${country}?`,
                answers: fields,
                correctAnswer: capital


            });

        }

        const saveData = () => {
            try {


                const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/userdb';
                mongoose.connect(mongoUri);

                var fields = questionData.answers;
                var correct_answer = questionData.correctAnswer;
                var false_options = [];
                for (var i = 0; i < 4; i++) {
                    if (fields[i] != correct_answer) {
                        false_options[i] = fiels[i];
                    }
                }

                const newQuestion = new Question({
                    enunciado: questionData.question,
                    respuesta_correcta: correct_answer,
                    respuesta_falsa1: false_options[0],
                    respuesta_falsa2: false_options[1],
                    respuesta_falsa3: false_options[2]
                });

                newQuestion.save();
            }catch (error) {
                console.error('Error en el guardado de datos:', error);
            }
        }

        fecthQuestionData();

    }, []);

    return questionData;
};

export default WikiDataService;
  