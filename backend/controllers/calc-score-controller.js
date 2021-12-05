const UserGame = require('../models/user-game');
const NBAGame = require('../models/nba-game');
const HttpError = require("../models/http-error");

const calcUserGameScore = async (req, res, next) => {
    const { gid, uid } = req.body;
    const nbaGames = await NBAGame.find();
    const userGame = await UserGame.findById(gid);

    for(let userP of userGame.users_pref){
        if(userP.userId === uid) {
            console.log(userP);
            userP.score = calcScore(nbaGames, userP.teams, userP.players);
            userP.change = 0;
        }
    }

    try {
        userGame.markModified('users_pref');
        await userGame.save();
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not update game score.',
            500
        );
        return next(error);
    }
    res.json(userGame);
}

const calcScore = (nbaGames, teams, players) => {
    let score = 0;

    for(let nbaGame of nbaGames){

        // Winner
        let winner;
        if(nbaGame.home.score > nbaGame.away.score)
            winner = nbaGame.home.id;
        else
            winner = nbaGame.away.id;
        for(let team of teams) {
            if(team === winner)
                score += 20;
        }

        for(let player of nbaGame.players) {
            if(player) {
                // Scorers:
                if (player.pid === players.scorers[0].id)
                    score += Math.floor(parseInt(player.points) / 2);
                if (player.pid === players.scorers[1].id)
                    score += Math.floor(parseInt(player.points) / 2);

                // Tscorers:
                if (player.pid === players.tscorers[0].id)
                    score += parseInt(player.tpm);
                if (player.pid === players.tscorers[1].id)
                    score += parseInt(player.tpm);

                // Assists:
                if (player.pid === players.assists[0].id)
                    score += parseInt(player.assists);
                if (player.pid === players.assists[1].id)
                    score += parseInt(player.assists);

                // Defenders:
                if (player.pid === players.defenders[0].id)
                    score += parseInt(player.steals) + parseInt(player.blocks);
                if (player.pid === players.defenders[1].id)
                    score += parseInt(player.steals) + parseInt(player.blocks);
            }
        }
    }
    return score;
}

module.exports = calcUserGameScore;