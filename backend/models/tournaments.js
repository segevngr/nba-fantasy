const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
    owner: {type: String, required: true},
    name: {type: String, required: true},
    users_pref: {type: Array, required: true},
});

module.exports = mongoose.model('Tournament', tournamentSchema);
