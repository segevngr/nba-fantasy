import axios from "axios";

const NEW = 'new', JOIN = 'join';


const calcTournamentScore = (tid, userId) => {
    console.log("INSIDE CALC")
    axios.post("http://localhost:5000/calc-score", {
        tid: tid,
        uid: userId})
        .then(response => {
            window.location.href = `http://localhost:3000/tournament/${tid}`;
        });
}

const createNewTournament = (userId, tournament, tid1, tid2, tid3, tid4, tid5, players) => {
    console.log("INSIDE NEW TOURNAMENT")
    console.log(players)
    console.log(userId)
    console.log(tournament)
    axios.post("http://localhost:5000/new-tournament", {
        owner: userId,
        name: tournament,
        teams: [tid1, tid2, tid3, tid4, tid5],
        players: {scorers: players[0], tscorers: players[1], assists: players[2], defenders: players[3]}})
        .then(response => {
            let tid = response.data;
            console.log(response.data)
            calcTournamentScore(tid, userId);
        });
};

const joinTournament = (userId, tournament, tid1, tid2, tid3, tid4, tid5, players) => {
    axios.post("http://localhost:5000/join-tournament", {
        tid: tournament,
        uid: userId,
        teams: [tid1, tid2, tid3, tid4, tid5],
        players: {scorers: players[0], tscorers: players[1], assists: players[2], defenders: players[3]}})
        .then(response => {
            calcTournamentScore(tournament, userId);
        });
};

const createOrJoinTournament = (userId, mode, tournament, tid1, tid2, tid3, tid4, tid5, players) => {
    if (mode === NEW) {
        createNewTournament(userId, tournament, tid1, tid2, tid3, tid4, tid5, players)
    }

    else if (mode === JOIN) {
        joinTournament(userId, tournament, tid1, tid2, tid3, tid4, tid5, players)
    }

};

export default createOrJoinTournament;