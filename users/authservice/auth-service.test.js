const request = require('supertest');
const { MongoMemoryServer } = require('mongodb-memory-server');
const bcrypt = require('bcrypt');
const User = require('./auth-model');

let mongoServer;
let app;

const newPassword = Math.floor(Math.random() * 10).toString(); // Genera una nueva contraseña aleatoria para evitar el Security Hostpot de SonarCloud en las pruebas

//test user
const user = {
  username: 'testuser',
  password: newPassword
};

const badUser = {
  username: 'testuser'
};

const userWithBadPassword = {
  username: 'testuser',
  password: ''
};

async function addUser(user){
  const hashedPassword = await bcrypt.hash(user.password, 10);
  const newUser = new User({
    username: user.username,
    password: hashedPassword,
  });

  await newUser.save();
}

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./auth-service'); 
  //Load database with initial conditions
  await addUser(user);
});

afterAll(async () => {
  app.close();
  await mongoServer.stop();
});

describe('Auth Service', () => {
  it('Should perform a login operation /login', async () => {
    const response = await request(app).post('/login').send(user);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('username', 'testuser');
  });
  
  it('Should not perform a login operation /login withouth a password', async () => {
    const response = await request(app).post('/login').send(badUser);
    expect(response.status).toBe(500);
    expect(response.body).toHaveProperty('error', 'Internal Server Error');
  });

  it('Should not perform a login operation /login with an incorrect password', async () => {
    const response = await request(app).post('/login').send(userWithBadPassword);
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('error', 'Invalid credentials');
  });
});
