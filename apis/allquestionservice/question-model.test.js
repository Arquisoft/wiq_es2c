const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Question = require('./question-model');

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    process.env.MONGODB_URI = mongoUri;
    await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe('Question Model', () => {
  it('should create a new question', async () => {
    const questionData = {
      enunciado: '¿Cuál es la capital de España?',
      respuesta_correcta: 'Madrid',
      respuesta_falsa1: 'París',
      respuesta_falsa2: 'Londres',
      respuesta_falsa3: 'Berlín',
    };

    const newQuestion = await Question.create(questionData);

    expect(newQuestion.enunciado).toBe(questionData.enunciado);
    expect(newQuestion.respuesta_correcta).toBe(questionData.respuesta_correcta);
    expect(newQuestion.respuesta_falsa1).toBe(questionData.respuesta_falsa1);
    expect(newQuestion.respuesta_falsa2).toBe(questionData.respuesta_falsa2);
    expect(newQuestion.respuesta_falsa3).toBe(questionData.respuesta_falsa3);
  });
});
