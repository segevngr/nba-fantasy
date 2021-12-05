const HttpError = require('../models/http-error');
const UserGame = require('../models/user-game');
const User = require('../models/user');

const getGame = async (req, res, next) => {
    const gid = req.params.gid;
    let game;
    try {
        game = await UserGame.findById(gid);
        if(!game)
            throw 'Game is Null!';
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find game.',
            500
        );
        return next(error);
    }

    res.json(game);
};

const createNewGame = async (req, res, next) => {
    const {owner, game_name, teams, players} = req.body;

    let userPref = {
        userId: owner,
        teams: teams,
        players: players,
    }

    const newGame = new UserGame({
        owner: owner,
        game_name: game_name,
        users_pref: [userPref],
    });

    try {
        await newGame.save(function (err, game) {
            addGameToUser(game._id.toString(), owner);
        });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not create new game.',
            500
        );
        return next(error);
    }
    res.json(newGame);
}

const joinGame = async (req, res, next) => {
    const {uid, gid, teams, players} = req.body;

    let userPref = {
        userId: uid,
        teams: teams,
        players: players,
    }

    let game = await UserGame.findById(gid);
    game.users_pref.push(userPref);
    await game.save();
    await addGameToUser(gid, uid);

    res.json(game);
}

const addGameToUser = async (gameId, userId) => {
    try {
        let user = await User.findById(userId);
        let userGames = user.games;
        userGames.push(gameId);
        user.games = userGames;
        await user.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update user games.',
            500
        );
    }
};


exports.createNewGame = createNewGame;
exports.getGame = getGame;
exports.joinGame = joinGame;