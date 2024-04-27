const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const User = require('./user-model');
const { randomBytes } = require('crypto');

let mongoServer;

function generateSecureRandomPassword(length) {
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+';
  const password = [];
  const bytes = randomBytes(length);
  for (let i = 0; i < length; i++) {
    const randomIndex = bytes[i] % characters.length;
    password.push(characters[randomIndex]);
  }
  return password.join('');
}

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
  it('should create a new user', async () => {
    const userData = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: generateSecureRandomPassword(8),
    };

    const newUser = await User.create(userData);

    expect(newUser.username).toBe(userData.username);
    expect(newUser.email).toBe(userData.email);
    expect(newUser.password).toBe(userData.password);
  });
});
