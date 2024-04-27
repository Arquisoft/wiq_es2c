const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const sinon = require('sinon');
const axios = require('axios');
const Question = require('./question-model');

jest.mock('./game-model'); // Mockea el modelo de Game
jest.mock('./question-model'); // Mockea el modelo de pregunta

let mongoServer;
let app;

const simulateError = async (method, path, errorMessage, errorData) => {
    const error = new Error(errorMessage);
    error.response = {
      status: 400,
      data: errorData
    };
  
    sinon.stub(axios, method).rejects(error);
  
    const response = await request(app)[method](path);
  
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe(errorData.error);
  
    axios[method].restore();
};

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./question'); 
});

afterAll(async () => {
    app.close();
    await mongoServer.stop();
});

describe('Question Generator test', () => {
    it('Should return a question when calling /generateQuestion', async () => {
        const response = await request(app)
            .get('/generateQuestion')
            .query({ thematic: 'Todas', user: 'user', language: 'es' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('responseQuestion', 'responseOptions', 'responseCorrectOption', 'question_Id', 'responseImage');
    }, 10000);

    it('Should manager errors when calling /generateQuestion', async () => {
        await simulateError('get', '/generateQuestion', 'Error al obtener datos', { error: "Error al obtener datos RangeError [ERR_OUT_OF_RANGE]: The value of \"max\" is out of range. It must be greater than the value of \"min\" (0). Received 0" });
    });

    it('Should configure the game when calling /configureGame', async () => {
        // Mock de la petición
        const response = await request(app)
            .post('/configureGame')
            .send({ valueQuestion: 5 });

        expect(response.status).toBe(200);
        expect(response.body).toBe(5);
    });

    it('Should manager errors when calling /configureGame', async () => {
        const response = await request(app)
            .post('/configureGame')
            .send({ });

        expect(response.status).toBe(400);
        expect(response.body).toHaveProperty("error");
    });

    it('Should update the question when calling /updateQuestion', async () => {
        const questionToSave = {
            _id: '12345abcde', 
        };

        // Mock de la función de mongoose
        Question.findByIdAndUpdate.mockResolvedValueOnce({ 
            _id: questionToSave._id,
            time: 10,
            correct: true,
        });

        const response = await request(app)
        .get('/updateQuestion')
        .send({ time: 10, correct: true });

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            message: 'Tiempo de pregunta actualizado exitosamente',
            updatedQuestion: {
                _id: questionToSave._id,
                time: 10,
                correct: true,
            },
        });
    });

    it('Should manager errors when calling /updateQuestion', async () => {
        // Mockeamos un error
        Question.findByIdAndUpdate.mockRejectedValueOnce(new Error('Error al actualizar las preguntas'));
        // Mock de la petición
        const response = await request(app)
            .get('/updateQuestion')
            .query({ });

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Error al actualizar las preguntas' });
    });

    it('Should restart the game when calling /restartGame', async () => {
        const response = await request(app).get('/restartGame');

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            message: 'Número de preguntas actualizado',
            numberOfQuestions: 0,
        });
    });
});