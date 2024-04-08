const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    userId:{
        type: String,
        ref: 'User',
        required: true,
    },
    totalGamesPlayed: {
        type: Number,
        required: true,
    },
    totalQuestionsAnswered: {
        type: Number,
        required: true,
    },
    totalRightQuestions: {
      type: Number,
      required: true,
    },
    totalIncorrectQuestions: {
        type: Number,
        required: true,
    },
    ratio: {
        type: Number,
        required: true,
    },
    totalTime: {
        type: Number,
        required: true,
      },

});

const Game = mongoose.model('Gamehistory', gameSchema);

module.exports = Game