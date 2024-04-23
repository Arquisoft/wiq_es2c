const { queries } = require('./text_questions');

describe('Image Questions', () => {
  it('Should contain a dictionary with the questions with images', async () => {
     expect(queries).toHaveProperty('en');
     expect(queries).toHaveProperty('es');
  });
});