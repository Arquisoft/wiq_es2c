const request = require('supertest');
const axios = require('axios');
const app = require('./gateway-service'); 
const { createServer } = require('http');

const server = createServer(app);

afterAll(async () => {
    app.close();
  });

jest.mock('axios');

describe('Gateway Service', () => {
  // Mock responses from external services
  axios.post.mockImplementation((url, data) => {
    if (url.endsWith('/login')) {
      return Promise.resolve({ data: { token: 'mockedToken' } });
    } else if (url.endsWith('/adduser')) {
      return Promise.resolve({ data: { userId: 'mockedUserId' } });
    }
  });

  // Test /login endpoint
  it('should forward login request to auth service', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe('mockedToken');
  });

  // Test /adduser endpoint
  it('should forward add user request to user service', async () => {
    const response = await request(app)
      .post('/adduser')
      .send({ username: 'newuser', password: 'newpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe('mockedUserId');
  });

  // Test /generateQuestion endpoint
  it('should receive the question', async () => {
    server.listen(8003);
  
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: {  responseQuestion: "¿Cual es la capital de España?", responseOptions: ["Madrid", "Barcelona", "Oviedo", "Valladolid"],
    responseCorrectOption: "Madrid", responseImage: null, question_id:"12345abcdef"} });
  
    const response = await request(app).get('/generateQuestion').query({
      user: 'user',
      newGame: true,
      numberOfQuestions: 5
    });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ responseQuestion: "¿Cual es la capital de España?", responseOptions: ["Madrid", "Barcelona", "Oviedo", "Valladolid"],
    responseCorrectOption: "Madrid", responseImage: null, question_id:"12345abcdef"});

    jest.restoreAllMocks();
    server.close(true);
  });

  it('should update the question', async () => {
    const updatedQuestion = {
      _id: '660434f228670016dfcac277',
      enunciado: '¿Cual es la capital de España?',
      respuesta_correcta: 'Madrid',
      respuesta_falsa1: 'Barcelona',
      respuesta_falsa2: 'Oviedo',
      respuesta_falsa3: 'Valladolid',
      __v: 0
      }
    jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: { message: "Tiempo de pregunta actualizado exitosamente", updatedQuestion: updatedQuestion } });

    const response = await request(app)
      .get('/updateQuestion')
      .send({ message: 'Pregunta actualizada', updatedQuestion: updatedQuestion });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Tiempo de pregunta actualizado exitosamente", updatedQuestion });
  })
});