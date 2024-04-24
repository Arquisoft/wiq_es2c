const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const sinon = require('sinon');
const axios = require('axios');
const User = require('./question-model');
const Question = require('./question-model');

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
    app = require('./allquestions-api'); 
});

afterAll(async () => {
    app.close();
    await mongoServer.stop();
});

afterEach(() => {
    sinon.restore();
});

describe('All questions api test', () => {
    it('Should return a allusers when calling /getAllQuestions', async () => {
        const questions = [
            { enunciado: '¿En que campo juega el Sociedad Deportiva Amorebieta?', respuesta_correcta: 'Campo Municipal de Urritxe'},
            { enunciado: 'pregunta2', respuesta_correcta: 'respuesta2'},
        ];
        sinon.stub(Question, 'find').resolves(questions);

        const res = await request(app).get('/getAllQuestions');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(questions.map(quest => ({
            enunciado: quest.enunciado,
            respuesta_correcta: quest.respuesta_correcta,
        })));
    });

    it('Should manager errors when calling /getAllQuestions', async () => {
        const errorMessage = 'Error al obtener preguntas';
        sinon.stub(Question, 'find').rejects(new Error(errorMessage));

        const res = await request(app).get('/getAllQuestions');

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: errorMessage });    });
});