const { queries } = require('./text_questions');

describe('Image Questions', () => {
  it('Should contain a dictionary with the questions with images', async () => {
     expect(queries).toHaveProperty('Geografia');
     expect(queries).toHaveProperty('Cultura');
     expect(queries).toHaveProperty('Informatica');
  });
});