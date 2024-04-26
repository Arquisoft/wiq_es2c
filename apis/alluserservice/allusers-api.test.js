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
    app = require('./allusers-api'); 
});

afterAll(async () => {
    app.close();
    await mongoServer.stop();
});

afterEach(() => {
    sinon.restore();
});

describe('All users api test', () => {
    it('Should return a allusers when calling /getAllUsers', async () => {
        const users = [
            { username: 'user1', email: 'user1@example.com', createdAt: "2024-04-14T20:21:34.969Z" },
            { username: 'user2', email: 'user2@example.com', createdAt: "2024-04-14T20:21:34.969Z" },
        ];
        sinon.stub(User, 'find').resolves(users);

        const res = await request(app).get('/getAllUsers');

        expect(res.status).toBe(200);
        expect(res.body).toEqual(users.map(user => ({
            username: user.username,
            email: user.email,
            creado: user.createdAt,
        })));
    });

    it('Should manager errors when calling /getAllUsers', async () => {
        const errorMessage = 'Error al obtener usuarios';
        sinon.stub(User, 'find').rejects(new Error(errorMessage));

        const res = await request(app).get('/getAllUsers');

        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: errorMessage });    });
});