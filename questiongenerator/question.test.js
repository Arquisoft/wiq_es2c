const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const sinon = require('sinon');
const axios = require('axios');

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
        // Mock de la petición
        const response = await request(app)
            .get('/generateQuestion')
            .query({ thematic: 'Todas', user: 'user' });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty('responseQuestion', 'responseOptions', 'responseCorrectOption', 'question_Id', 'responseImage');
    });

    it('Should manager errors when calling /generateQuestion', async () => {
        await simulateError('get', '/generateQuestion', 'Error al obtener datos', { error: 'Error al obtener datos Error: Error al obtener datos' });
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
});