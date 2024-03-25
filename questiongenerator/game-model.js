const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
    userId:{
        type: String,
        ref: 'User',
        required: true,
    },
    questions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Question'
        }
    ]

});

const Game = mongoose.model('Game', gameSchema);

module.exports = Game