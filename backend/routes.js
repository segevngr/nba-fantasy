const express = require('express');

const dataControllers = require('./controllers/data-controllers');
const gamesControllers = require('./controllers/games-controllers');
const usersControllers = require('./controllers/users-controllers');

const router = express.Router();

router.get('/get-upcoming-games', dataControllers.getUpcoming);
router.get('/get-players', dataControllers.getPlayers);
router.get('/get-games-stats', dataControllers.getGamesStats);

router.post('/signup', usersControllers.signup);
router.post('/login', usersControllers.login);

router.get('/users', usersControllers.getUsers);
router.get('/user/:uid', usersControllers.getUser);
router.get('/game/:gid', gamesControllers.getGame);

router.post('/add-game', gamesControllers.createNewGame);
router.post('/join-game', gamesControllers.joinGame);


module.exports = router;