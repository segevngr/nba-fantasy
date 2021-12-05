const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gameSchema = new Schema({
    gameId: { type: String, required: true },
    date: { type: String, required: true },
    home: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        score: { type: String, required: true },
    },
    away: {
        id: { type: String, required: true },
        name: { type: String, required: true },
        score: { type: String, required: true },
    },
    players: {type: Array, required: true},
});

module.exports = mongoose.model('NBAGame', gameSchema);
