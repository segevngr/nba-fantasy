const axios = require('axios');
const Player = require('../models/player');

async function fetchPlayersNames() {

    const teams1 = [1, 2, 4, 5, 6, 7, 8, 9]
    const teams2 = [10, 11, 14, 15, 16, 17, 19, 20]
    const teams3 = [21, 22, 23, 24, 25, 26, 27, 28]
    const teams4 = [29, 30, 31, 38, 40, 41]

    const players_req = (id) => {
        return ({
            method: 'GET',
            url: `https://api-nba-v1.p.rapidapi.com/players/teamId/${id}`,
            headers: {
                'x-rapidapi-host': 'api-nba-v1.p.rapidapi.com',
                'x-rapidapi-key': 'a40f1906b7msh701ec4402a14ff9p1bd2bbjsn0a9df994bd40'
            }
        })
    };

    for (let team of teams4) {
        const playersRes = await axios.request(players_req(team));
        const players = playersRes.data.api.players;

        for (let player of players) {
            const newPlayer = new Player({
                id: player.playerId,
                name: player.firstName + ' ' + player.lastName,
            });
            await newPlayer.save();
        }

    }
    console.log("done fetching players")
}

module.exports = fetchPlayersNames;