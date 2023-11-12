const axios = require('axios');
const Upcoming = require('../models/upcoming');

const DATE = '2021-11-27';

async function fetchUpcomingGames() {

    let upcoming_games_req = {
        method: 'GET',
        url: `https://api-nba-v1.p.rapidapi.com/games/date/${DATE}`,
        headers: {
            'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
            'x-rapidapi-key': 'KEY'
        }
    };

    const upcomingRes = await axios.request(upcoming_games_req);
    const upcomingGamesData = upcomingRes.data.api.games;

    for (let game of upcomingGamesData) {
        const newUpcomingGame = new Upcoming({
            gameId: game.gameId,
            homeId: game.hTeam.teamId,
            homeName: game.hTeam.fullName,
            awayId: game.vTeam.teamId,
            awayName: game.vTeam.fullName,
            date: DATE,
        });
        await newUpcomingGame.save();
    }

}

module.exports = fetchUpcomingGames;