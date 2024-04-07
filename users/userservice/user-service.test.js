const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let app;

const newUser = {
  username: 'testuser',
  email: 'testuser@correo.com',
  password: 'testpassword'
};

const badNewUser = {
  username: 'testuser',
  password: 'testpassword'
};

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
    const response = await request(app).post('/adduser').send(newUser);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('email', 'testuser@correo.com');
  });

  it('trying to add a new user on POST /adduser withouth an email', async () => {
    const response = await request(app).post('/adduser').send(badNewUser);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'Missing required field: email');
  });

  it('adding two times the same user', async () => {
    const badResponse = await request(app).post('/adduser').send(newUser);
    expect(badResponse.status).toBe(400);
    expect(badResponse.body).toHaveProperty('error', 'Ya se ha registrado un usuario con ese email o nombre de usuario');
  });
});
