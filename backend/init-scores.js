const UserGame = require('./models/user-game');
const NBAGame = require('./models/nba-game');

async function initScores() {

    const nbaGames = await NBAGame.find();
    const userGames = await UserGame.find();
    console.log("done fetching from db");
    for(let game of userGames){
        for(let userP of game.users_pref){
            let score = calcUserGameScore(nbaGames, userP.teams, userP.players);
            userP.score = score;
            userP.change = 0;
        }
        game.markModified('users_pref');
        await game.save();
    }
    console.log("done updating scores");
}

const calcUserGameScore = (nbaGames, teams, players) => {
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

module.exports = initScores;