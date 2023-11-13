import axios from "axios";

const NEW = 'new', JOIN = 'join';


const calcTournamentScore = (auth, tid) => {
    axios.post("http://localhost:5000/calc-score", {
            tid: tid,
            uid: auth.userId
        },
        {
            headers: {'Authorization': `Bearer ${auth.token}`,},
        })
        .then(response => {
            window.location.href = `http://localhost:3000/tournament/${tid}`;
        });
}

const createNewTournament = (auth, tournament, tid1, tid2, tid3, tid4, tid5, players) => {
    axios.post("http://localhost:5000/new-tournament", {
            owner: auth.userId,
            name: tournament,
            teams: [tid1, tid2, tid3, tid4, tid5],
            players: {scorers: players[0], tscorers: players[1], assists: players[2], defenders: players[3]}
        },
        {
            headers: {'Authorization': `Bearer ${auth.token}`,},
        })
        .then(response => {
            let tid = response.data;
            console.log(response.data)
            calcTournamentScore(auth, tid);
        });
};

const joinTournament = (auth, tournament, tid1, tid2, tid3, tid4, tid5, players) => {
    axios.post("http://localhost:5000/join-tournament", {
            tid: tournament,
            uid: auth.userId,
            teams: [tid1, tid2, tid3, tid4, tid5],
            players: {scorers: players[0], tscorers: players[1], assists: players[2], defenders: players[3]}
        },
        {
            headers: {'Authorization': `Bearer ${auth.token}`,},
        }).then(response => {
        calcTournamentScore(auth, tournament);
    });
};

const createOrJoinTournament = (auth, mode, tournament, tid1, tid2, tid3, tid4, tid5, players) => {
    if (mode === NEW) {
        createNewTournament(auth, tournament, tid1, tid2, tid3, tid4, tid5, players)
    }

    else if (mode === JOIN) {
        joinTournament(auth, tournament, tid1, tid2, tid3, tid4, tid5, players)
    }

};

export default createOrJoinTournament;