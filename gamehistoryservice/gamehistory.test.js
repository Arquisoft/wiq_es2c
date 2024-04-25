const request = require('supertest');
const sinon = require('sinon');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Game = require('./gamehistory-model');

let mongoServer;
let app;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  process.env.MONGODB_URI = mongoUri;
  app = require('./gamehistory'); 
  let gameInfo =  {userId: "testuser", 
    totalGamesPlayed: 10,
    totalQuestionsAnswered: 30,
    totalRightQuestions: 25,
    totalIncorrectQuestions: 5,
    ratio: 83, 
    totalTime: 150, };

  const testGame = new Game(gameInfo);
  await testGame.save();
});

afterAll(async () => {
  app.close();
  await mongoServer.stop();
});

describe('Game History Service', () => {
    it('should save the game history of a existing user', async () => {
        const res = await request(app)
            .post('/saveGameHistory')
            .send({ username: 'tetsuser' });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({ success: true });
    });

    it('should manage an error when user does not exist', async () => {
        const res = await request(app)
            .post('/saveGameHistory')
            .send();

        expect(res.status).toBe(400);
        expect(res.body.error).toContain('Error al guardar el historial del juego');
    });

    it('Should obtain the game history of a existing user', async () => {
        const res = await request(app)
            .get('/gamehistory')
            .query({ username: 'testuser' });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            userId: "testuser",
            totalGamesPlayed: 10,
            totalQuestionsAnswered: 30,
            totalRightQuestions: 25,
            totalIncorrectQuestions: 5,
            ratio: "83%",
            totalTime: "150s"
        });
    });

    it('Should obtain the game history of a non existing user', async () => {
        const res = await request(app)
            .get('/gamehistory')
            .query({ username: 'hola' });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            userId: null,
            totalGamesPlayed: 0,
            totalQuestionsAnswered: 0,
            totalRightQuestions: 0,
            totalIncorrectQuestions: 0,
            ratio: 0,
            totalTime: 0
          });
    });
    
    it('Should manage errors when calling withouth a user', async () => {
        const res = await request(app)
            .get('/gamehistory')
            .send();

        expect(res.status).toBe(400);
        expect(res.body.error).toContain('Error al obtener el historial del juego');
    });

    /*
    it('Should obtain the end game statistics of an existing user', async () => {
        const gameStatsMock = {
            totalRightQuestions: 5,
            totalIncorrectQuestions: 3,
            ratio: 62,
            totalTime: 120,
            endgameImageWithRatio: '../webapp/src/components/images/ronnie-comiendo.png',
          };

        let getEndGameStatsStub = sinon.stub().resolves(gameStatsMock);
    
        const res = await request(app)
          .get('/endgamestats')
          .query({ username: 'testuser' });
    
        expect(res.status).toBe(200);
        expect(res.body).toEqual({
          totalRightQuestions: gameStatsMock.totalRightQuestions,
          totalIncorrectQuestions: gameStatsMock.totalIncorrectQuestions,
          ratio: gameStatsMock.ratio + "%",
          totalTime: gameStatsMock.totalTime + "s",
          endgameImageWithRatio: gameStatsMock.ratio,
        });

        getEndGameStatsStub.restore();
        aggregateStub.restore();
      });
    
    it('Should obtain empty stastistics of an non existing user', async () => {
        const gameStatsMock = {
            totalRightQuestions: 5,
            totalIncorrectQuestions: 3,
            ratio: 62,
            totalTime: 120,
            endgameImageWithRatio: '../webapp/src/components/images/ronnie-comiendo.png',
          };

        let getEndGameStatsStub = sinon.stub().resolves(gameStatsMock);

        const res = await request(app)
            .get('/endgamestats')
            .query({ username: 'hola' });

        expect(res.status).toBe(200);
        expect(res.body).toEqual({
            totalRightQuestions: 0,
            totalIncorrectQuestions: 0,
            ratio: "0%",
            totalTime: "0s",
            endgameImageWithRatio: 0,
        });

        getEndGameStatsStub.restore();
    });
    */

    it('Should manage an error when calling withoutg a user', async () => {
        const res = await request(app)
            .get('/endgamestats')
            .send();

        expect(res.status).toBe(400);
        expect(res.body.error).toContain('Error al obtener las estadísticas de la partida');
    });

     it('should return the top users ranked by ratio', async () => {
        // Borramos el usuario que hay en la base de datos: testuser
        await Game.deleteMany();
        const gameHistories = [
            { userId: 'user1', ratio: 90, totalGamesPlayed: 10, totalQuestionsAnswered: 30, totalRightQuestions: 25, totalIncorrectQuestions: 5, totalTime: 150 },
            { userId: 'user2', ratio: 85, totalGamesPlayed: 8, totalQuestionsAnswered: 25, totalRightQuestions: 20, totalIncorrectQuestions: 5, totalTime: 120 },
            { userId: 'user3', ratio: 80, totalGamesPlayed: 15, totalQuestionsAnswered: 45, totalRightQuestions: 36, totalIncorrectQuestions: 9, totalTime: 180 },
        ];
        await Game.insertMany(gameHistories);

        const response = await request(app)
            .get('/topUsers');

        expect(response.status).toBe(200);
        console.log(response.body);
        expect(response.body).toEqual({
            primero: 'user1 - 90%',
            segundo: 'user2 - 85%',
            tercero: 'user3 - 80%'
        });
    });

    it('should manage an error when an error occur', async () => {
        // Forzamos un error en la consulta a la base de datos
        jest.spyOn(Game, 'find').mockImplementationOnce(() => {
            throw new Error('Database error');
        });

        const response = await request(app)
            .get('/topUsers');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Error al obtener el ranking de usuarios: Database error' });
    });

    it('should return the ranking of users sorted by ratio', async () => {
        // Borramos el usuario que hay en la base de datos: testuser
        await Game.deleteMany();
        const gameHistories = [
            { userId: 'user1', ratio: 90, totalGamesPlayed: 10, totalQuestionsAnswered: 30, totalRightQuestions: 25, totalIncorrectQuestions: 5, totalTime: 150 },
            { userId: 'user2', ratio: 85, totalGamesPlayed: 8, totalQuestionsAnswered: 25, totalRightQuestions: 20, totalIncorrectQuestions: 5, totalTime: 120 },
            { userId: 'user3', ratio: 80, totalGamesPlayed: 15, totalQuestionsAnswered: 45, totalRightQuestions: 36, totalIncorrectQuestions: 9, totalTime: 180 },
        ];
        await Game.insertMany(gameHistories);

        const response = await request(app)
            .get('/ranking');

        expect(response.status).toBe(200);
        expect(response.body).toEqual([
            { userId: 'user1', totalGamesPlayed: 10, totalQuestionsAnswered: 30, totalRightQuestions: 25, ratio: '90%', totalTime: '150s' },
            { userId: 'user2', totalGamesPlayed: 8, totalQuestionsAnswered: 25, totalRightQuestions: 20, ratio: '85%', totalTime: '120s' },
            { userId: 'user3', totalGamesPlayed: 15, totalQuestionsAnswered: 45, totalRightQuestions: 36,  ratio: '80%', totalTime: '180s' },
        ]);
    });

    it('should manage an error when an error occur', async () => {
        // Forzamos un error en la consulta a la base de datos
        jest.spyOn(Game, 'find').mockImplementationOnce(() => {
            throw new Error('Database error');
        });

        const response = await request(app)
            .get('/ranking');

        expect(response.status).toBe(400);
        expect(response.body).toEqual({ error: 'Error al obtener el ranking: Database error' });
    });
});
