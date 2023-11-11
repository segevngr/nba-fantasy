const HttpError = require('../models/http-error');
const Tournament = require('../models/tournaments');
const User = require('../models/user');

const getTournamentById = async (req, res, next) => {
    let tournament;
    try {
        tournament = await Tournament.findById(req.params.tid);
        if(!tournament)
            throw 'Tournament is Null!';
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find tournament.',
            500
        );
        return next(error);
    }

    res.json(tournament);
};

// Gets users input from Client and creates new tournament under its ownership
const createNewTournament = async (req, res, next) => {
    const {owner, name, teams, players} = req.body;

    let userPref = {
        userId: owner,
        teams: teams,
        players: players,
    }

    const newTournament = new Tournament({
        owner: owner,
        name: name,
        users_pref: [userPref],
    });

    try {
        await newTournament.save(
            (err, tournament) => {
                let tournamentId = tournament._id.toString();
                res.json(tournamentId);
                addTournamentToUser(tournamentId, owner);
            });
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not create a new tournament.',
            500
        );
        return next(error);
    }
}

// Gets user id and tournament id from Client and joins the user to the tournament
const joinTournament = async (req, res, next) => {
    const {uid, tid: tid, teams, players} = req.body;

    let userPref = {
        userId: uid,
        teams: teams,
        players: players,
    }

    let tournament = await Tournament.findById(tid);
    tournament.users_pref.push(userPref);
    await tournament.save();
    await addTournamentToUser(tid, uid);

    res.json(tournament);
}

const addTournamentToUser = async (tournamentId, userId) => {
    try {
        let user = await User.findById(userId);
        let userTournaments = user.tournaments;
        userTournaments.push(tournamentId);
        user.tournaments = userTournaments;
        await user.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update user Tournaments.',
            500
        );
    }
};


exports.createNewTournament = createNewTournament;
exports.getTournamentById = getTournamentById;
exports.joinTournament = joinTournament;