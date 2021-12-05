const axios = require('axios');
const NBAGame = require('../models/nba-game');

async function fetchGamesStats(DATE) {

    let games_req = {
        method: 'GET',
        url: `https://api-nba-v1.p.rapidapi.com/games/date/${DATE}`,
        headers: {
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key': 'KEY'
        }
    };

    const players_req = (id) => {
        return {
            method: 'GET',
            url: `https://api-nba-v1.p.rapidapi.com/statistics/players/gameId/${id}`,
            headers: {
                'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
                'x-rapidapi-key': 'KEY'
            }
        }
    }

    const gamesRes = await axios.request(games_req);
    const games = gamesRes.data.api.games;

    for (let game of games) {
        console.log("fetching data for game " +game.gameId)
        // get players stats:
        const playersReq = players_req(game.gameId);
        const playersRes = await axios.request(playersReq);
        let playersArr = Array(30);
        let players = playersRes.data.api.statistics;
        for(let i = 0; i < players.length; i++) {
            playersArr[i] = {
                pid: players[i].playerId,
                points: players[i].points,
                tpm: players[i].tpm,
                assists: players[i].assists,
                reb: players[i].defReb,
                steals: players[i].steals,
                blocks: players[i].blocks,
            };
        }

        const newGame = new NBAGame({
            gameId: game.gameId,
            date: DATE,
            home: {
                id: game.hTeam.teamId,
                name: game.hTeam.fullName,
                score: game.hTeam.score.points,
            },
            away: {
                id: game.vTeam.teamId,
                name: game.vTeam.fullName,
                score: game.vTeam.score.points,
            },
            players: playersArr,
        });
        await newGame.save();
    }

    console.log("done fetching");

}

module.exports = fetchGamesStats;