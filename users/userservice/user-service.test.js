const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./user-service'); 
});

afterAll(async () => {
    app.close();
    await mongoServer.stop();
});

describe('User Service', () => {
  it('should add a new user on POST /adduser', async () => {
    const newUser = {
      username: 'testuser',
      email: 'testuser@correo.com',
      password: 'testpassword'
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('email', 'testuser@correo.com');
  });

  it('trying to add a new user on POST /adduser withouth an email', async () => {
    const newUser = {
      username: 'testuser',
      password: 'testpassword'
    };

    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Missing required field: email');
  });
});
