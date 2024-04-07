const request = require('supertest');
const axios = require('axios');
const app = require('./gateway-service'); 
const { createServer } = require('http');
const sinon = require('sinon');

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

  // Test /health endpoint
  it('should forward login request to auth service', async () => {
    const response = await request(app)
      .get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('OK');
  });

  // Test /login endpoint
  it('should forward login request to auth service', async () => {
    const response = await request(app)
      .post('/login')
      .send({ username: 'testuser', password: 'testpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBe('mockedToken');
  });

  // Test /login endpoint
  it('should catch the errors when send /login that might appear during runtime', async () => {
    const error = new Error('Authentication error');
    error.response = {
      status: 400,
      data: { error: 'Unauthorized' }
    };

    // Sobreescribimos la función axios.post para que arroje el error simulado
    sinon.stub(axios, 'post').rejects(error);

    const response = await request(app)
      .post('/login');

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Unauthorized');

    // Restauramos axios para que no nos afecte en futuras pruebas
    axios.post.restore();
  });

  // Test /adduser endpoint
  it('should forward add user request to user service', async () => {
    const response = await request(app)
      .post('/adduser')
      .send({ username: 'newuser', email: 'newuser@email.com', password: 'newpassword' });

    expect(response.statusCode).toBe(200);
    expect(response.body.userId).toBe('mockedUserId');
  });

  // Test /adduser endpoint
  it('should catch the errors when send /adduser that might appear during runtime', async () => {
    const error = new Error('Registration error');
    error.response = {
      status: 400,
      data: { error: 'Uncomplete information' }
    };

    // Sobreescribimos la función axios.post para que arroje el error simulado
    sinon.stub(axios, 'post').rejects(error);

    const response = await request(app)
      .post('/adduser');

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Uncomplete information');

    // Restauramos axios para que no nos afecte en futuras pruebas
    axios.post.restore();
  });

  // Test /generateQuestion endpoint
  it('should catch the errors when send /generateQuestion that might appear during runtime', async () => {
    const error = new Error('Generation error');
    error.response = {
      status: 400,
      data: { error: 'Cannot generate a question' }
    };

    // Sobreescribimos la función axios.post para que arroje el error simulado
    sinon.stub(axios, 'get').rejects(error);

    const response = await request(app)
      .get('/generateQuestion');

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('Cannot generate a question');

    // Restauramos axios para que no nos afecte en futuras pruebas
    axios.get.restore();
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

  // Test /updateQuestion endpoint
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

    jest.restoreAllMocks();
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Tiempo de pregunta actualizado exitosamente", updatedQuestion });
  });

  // Test /updateQuestion endpoint
  it('should catch the errors when send /updateQuestion that might appear during runtime', async () => {
    const error = new Error('Update error');
    error.response = {
      status: 400,
      data: { error: 'An error has occured updating a question' }
    };

    // Sobreescribimos la función axios.post para que arroje el error simulado
    sinon.stub(axios, 'get').rejects(error);

    const response = await request(app)
      .get('/updateQuestion');

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('An error has occured updating a question');

    // Restauramos axios para que no nos afecte en futuras pruebas
    axios.get.restore();
  });

  // Test /saveGameHistory endpoint
  it('should save game history', async () => {
    // Sobreescribimos la función axios.post para que arroje el error simulado
    const axiosStub = sinon.stub(axios, 'post');
    axiosStub.returns(Promise.resolve({ data: { success: true } }));

    const response = await request(app)
      .post('/saveGameHistory')
      .send({ username: 'testuser' });

    expect(response.status).toBe(200);

    // Restauramos axios para que no nos afecte en futuras pruebas
    axios.post.restore();
  });

  // Test /saveGameHistory endpoint
  it('should catch the errors when send /saveGameHistory that might appear during runtime', async () => {
    const error = new Error('saving game history error');
    error.response = {
      status: 400,
      data: { error: 'An error has occured saving the game history' }
    };

    // Sobreescribimos la función axios.post para que arroje el error simulado
    sinon.stub(axios, 'post').rejects(error);

    const response = await request(app)
      .post('/saveGameHistory');

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('An error has occured saving the game history');

    // Restauramos axios para que no nos afecte en futuras pruebas
    axios.post.restore();
  });

  // Test /gamehistory endpoint
  it('should get the game history', async () => {
    // Sobreescribimos la función axios.post para que arroje el error simulado
    const axiosStub = sinon.stub(axios, 'get');
          axiosStub.returns(Promise.resolve({data: {userId: '12345abcdef',
          totalGamesPlayed: 1,
          totalQuestionsAnswered: 5,
          totalRightQuestions: 5,
          totalIncorrectQuestions: 0,
          ratio: 100,
          totalTime:15 } }));

    const response = await request(app)
      .get('/gamehistory')
      .send({ username: 'testuser' });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('userId');
    expect(response.body).toHaveProperty('totalGamesPlayed');
    expect(response.body).toHaveProperty('totalQuestionsAnswered');
    expect(response.body).toHaveProperty('totalRightQuestions');
    expect(response.body).toHaveProperty('totalIncorrectQuestions');
    expect(response.body).toHaveProperty('ratio');
    expect(response.body).toHaveProperty('totalTime');

    // Restauramos axios para que no nos afecte en futuras pruebas
    axios.get.restore();
  });

  // Test /gamehistory endpoint
  it('should catch the errors when send /gamehistory that might appear during runtime', async () => {
    const error = new Error('saving game history error');
    error.response = {
      status: 400,
      data: { error: 'An error has occured getting the game history' }
    };

    // Sobreescribimos la función axios.post para que arroje el error simulado
    sinon.stub(axios, 'get').rejects(error);

    const response = await request(app)
      .get('/gamehistory');

    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBe('An error has occured getting the game history');

    // Restauramos axios para que no nos afecte en futuras pruebas
    axios.get.restore();
  });
});