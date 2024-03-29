const express = require('express');

const nbaDataControllers = require('./controllers/nba-data-controllers');
const tournamentControllers = require('./controllers/tournament-controllers');
const usersControllers = require('./controllers/user-controllers');
const calcScoreController = require('./controllers/calc-score-controller')
const {checkAuth} = require("./check-auth");

const router = express.Router();


router.post('/signup', usersControllers.signup);
router.post('/login', usersControllers.login);
router.get('/get-upcoming-games', nbaDataControllers.getAllUpcomingGames);

router.use(checkAuth)

router.get('/get-players', nbaDataControllers.getAllPlayers);
router.get('/get-nba-games', nbaDataControllers.getAllNBAGames);
router.get('/get-latest-nba-games', nbaDataControllers.getLatestNBAGames);

router.get('/users', usersControllers.getAllUsers);
router.get('/user/:uid', usersControllers.getUserById);
router.get('/tournament/:tid', tournamentControllers.getTournamentById);

router.post('/new-tournament', tournamentControllers.createNewTournament);
router.post('/join-tournament', tournamentControllers.joinTournament);
router.post('/calc-score', calcScoreController);


module.exports = router;