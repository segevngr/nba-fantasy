const HttpError = require('../models/http-error');
const NBAGame = require('../models/nba-game')
const Upcoming = require('../models/upcoming')
const Player = require('../models/player');

// Gets all NBA games stats from db
const getAllNBAGames = async (req, res, next) => {
    let nbaGames;
    try {
        nbaGames = await NBAGame.find();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find games stats.',
            500
        );
        return next(error);
    }

    res.json(nbaGames);
};

// Gets all NBA upcoming games data from db
const getAllUpcomingGames = async (req, res, next) => {
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

// Gets all NBA player names and ids from db
const getAllPlayers = async (req, res, next) => {
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

exports.getAllNBAGames = getAllNBAGames;
exports.getAllUpcomingGames = getAllUpcomingGames;
exports.getAllPlayers = getAllPlayers;
