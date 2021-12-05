const User = require('../models/user-game');

async function createDummyUser() {

    const newUser = new User({
        teams: ['29', '17', '28', '4', '20'],
        players: {
            scorers: [{id: '153', name: 'Kevin Durant'}, {id: '64', name: 'Devin Booker'}],
            assists: [{id: '415', name: 'Chris Paul'}, {id: '265', name: 'LeBron James'}],
            three: [{id: '361', name: 'Khris Middleton'}, {id: '319', name: 'Damian Lillard'}],
            defenders: [{id: '2564', name: 'Deni Avdija'}, {id: '92', name: 'Clint Capela'}],
        }
    });

    await newUser.save();
}

module.exports = createDummyUser;