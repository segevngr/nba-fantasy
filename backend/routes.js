const express = require('express');

const dataControllers = require('./controllers/data-controllers');
const gamesControllers = require('./controllers/games-controllers');
const usersControllers = require('./controllers/users-controllers');
const calcScoreController = require('./controllers/calc-score-controller')

const router = express.Router();

router.get('/get-upcoming-games', dataControllers.getUpcoming);
router.get('/get-players', dataControllers.getPlayers);
router.get('/get-games-stats', dataControllers.getGamesStats);

router.post('/signup', usersControllers.signup);
router.post('/login', usersControllers.login);

router.get('/users', usersControllers.getUsers);
router.get('/user/:uid', usersControllers.getUser);
router.get('/game/:gid', gamesControllers.getGame);

router.post('/new-game', gamesControllers.createNewGame);
router.post('/join-game', gamesControllers.joinGame);
router.post('/calc-score', calcScoreController);


module.exports = router;