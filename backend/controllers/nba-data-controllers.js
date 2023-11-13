const HttpError = require('../models/http-error');
const NBAGame = require('../models/nba-game')
const Upcoming = require('../models/upcoming')
const Player = require('../models/player');

LATEST_GAMES_COUNT = 10

// USed to Fetch NBA Data from the DB

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

const getLatestNBAGames = async (req, res, next) => {
    let latestGames;
    try {
        latestGames = await NBAGame.find().sort({date: -1}).limit(LATEST_GAMES_COUNT);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find games stats.',
            500
        );
        return next(error);
    }

    res.json(latestGames);
};

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
exports.getLatestNBAGames = getLatestNBAGames;
