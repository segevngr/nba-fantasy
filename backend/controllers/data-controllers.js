const HttpError = require('../models/http-error');
const NBAGame = require('../models/nba-game')
const Upcoming = require('../models/upcoming')
const Player = require('../models/player');


const getGamesStats = async (req, res, next) => {
    let gamesStats;
    try {
        gamesStats = await NBAGame.find();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find games stats.',
            500
        );
        return next(error);
    }

    res.json(gamesStats);
};

const getUpcoming = async (req, res, next) => {
    let upcomingGames;
    try {
        upcomingGames = await Upcoming.find();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find upcoming games.',
            500
        );
        return next(error);
    }

    res.json(upcomingGames);
};

const getPlayers = async (req, res, next) => {
    const pid = req.params.pid;
    let playerNames;
    try {
        playerNames = await Player.find();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find user.',
            500
        );
        return next(error);
    }

    res.json(playerNames);
};

exports.getGamesStats = getGamesStats;
exports.getUpcoming = getUpcoming;
exports.getPlayers = getPlayers;
