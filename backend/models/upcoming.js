const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const upcomingSchema = new Schema({
    gameId: { type: String, required: true },
    homeId: { type: String, required: true },
    homeName: { type: String, required: true },
    awayId: { type: String, required: true },
    awayName: { type: String, required: true },
    date: { type: String, required: true },
});

module.exports = mongoose.model('Upcoming', upcomingSchema);
