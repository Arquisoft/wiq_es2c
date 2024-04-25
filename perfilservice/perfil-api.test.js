const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const sinon = require('sinon');
const axios = require('axios');
const User = require('./user-model')

jest.mock('./user-model'); // Mockea el modelo de pregunta

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
    app = require('./perfil-api'); 
});

afterAll(async () => {
    app.close();
    await mongoServer.stop();
});

afterEach(() => {
    sinon.restore();
});

describe('Profile api test', () => {
    it('should return the user', async () => {
        const user = { username: 'user1', email: 'user1@example.com', createdAt: "2024-04-14T20:21:34.969Z" };
        sinon.stub(User, 'findOne').resolves(user);

        const res = await request(app).get('/getUser').query({ username: 'user1' });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            username: user.username,
            email: user.email,
            creado: user.createdAt,
        });
    });

    it('should return 400 if there is an error', async () => {
        const errorMessage = 'Error al obtener usuario';
        sinon.stub(User, 'findOne').rejects(new Error(errorMessage));

        const res = await request(app).get('/getUser').query({ username: 'user1' });

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: errorMessage });
    });
});