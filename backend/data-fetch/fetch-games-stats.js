const axios = require('axios');
const NBAGame = require('../models/nba-game');

async function fetchGamesStats(DATE) {

    // Fetch All Game stats in certain date
    let games_req = {
        method: 'GET',
        url: `https://api-nba-v1.p.rapidapi.com/games/date/${DATE}`,
        headers: {
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key': 'KEY'
        }
    };

    // Fetch all players stats in certain game by game id
    const players_req = (gameId) => {
        return {
            method: 'GET',
            url: `https://api-nba-v1.p.rapidapi.com/statistics/players/gameId/${gameId}`,
            headers: {
                'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
                'x-rapidapi-key': 'KEY'
            }
        }
    }

    const gamesRes = await axios.request(games_req);
    const gamesStats = gamesRes.data.api.games;

    for (let gameStats of gamesStats) {
        // Get players stats:
        const playersReq = players_req(gameStats.gameId);
        const playersRes = await axios.request(playersReq);
        let playersStats = playersRes.data.api.statistics;

        let playersArr = Array(30);
        for(let i = 0; i < playersStats.length; i++) {
            playersArr[i] = {
                pid: playersStats[i].playerId,
                points: playersStats[i].points,
                tpm: playersStats[i].tpm,
                assists: playersStats[i].assists,
                reb: playersStats[i].defReb,
                steals: playersStats[i].steals,
                blocks: playersStats[i].blocks,
            };
        }

        const newGame = new NBAGame({
            gameId: gameStats.gameId,
            date: DATE,
            home: {
                id: gameStats.hTeam.teamId,
                name: gameStats.hTeam.fullName,
                score: gameStats.hTeam.score.points,
            },
            away: {
                id: gameStats.vTeam.teamId,
                name: gameStats.vTeam.fullName,
                score: gameStats.vTeam.score.points,
            },
            players: playersArr,
        });
        await newGame.save();
    }

    console.log("Done fetching game stats.");
}

module.exports = fetchGamesStats;