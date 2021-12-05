const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const fetchGamesStats = require('./data-fetch/fetch-games-stats');
const fetchPlayersNames = require('./data-fetch/fetch-players-names');
const initScores = require('./controllers/calc-score-controller');


const routes = require('./routes');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');

    next();
});

app.use('/', routes);

mongoose
    .connect(
        `mongodb+srv://segev:pass@cluster0.g4cl7.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
    )
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });