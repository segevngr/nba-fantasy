const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userGameSchema = new Schema({
    owner: {type: String, required: true},
    game_name: {type: String, required: true},
    users_pref: {type: Array, required: true},
});

module.exports = mongoose.model('UserGame', userGameSchema);
