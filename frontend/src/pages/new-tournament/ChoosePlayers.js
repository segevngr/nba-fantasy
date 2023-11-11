import React, {useEffect, useState, useContext} from 'react';
import './ChoosePlayers.css';
import PlayersInput from "../../components/add-tournament/PlayersInput";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {AuthContext} from "../../utils/auth-context";

const ChoosePlayers = () => {
    const auth = useContext(AuthContext);
    const {tournament_name, tid1, tid2, tid3, tid4, tid5} = useParams();

    const [playersMap, setPlayersMap] = useState('');
    const [players, setPlayers] = useState(Array(4).fill([null, null]));
    const [inputCount, setInputCount] = useState(Array(4).fill(0));
    const [isValid, setIsValid] = useState(true);

    const updatePlayers = (id, inputPlayers) => {
        let newPlayers = players.slice();
        newPlayers[id] = inputPlayers;
        setPlayers(newPlayers);
    }

    const updateInputCount = (id, count) => {
        let newCount = inputCount.slice();
        newCount[id] = count;
        setInputCount(newCount);
    }

    const isValidInput = () => {
        for(let count of inputCount) {
            if (count !== 2)
                return false;
        }
        return true;
    }

    useEffect(() => {
        axios.get("http://localhost:5000/get-players").then(response => {
            let players = response.data;
            players.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            players = players.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i)
            setPlayersMap(players);
        })
    }, []);

    const saveTournament = () => {
        if(!isValidInput()) {
            setIsValid(false);
            return;
        }
        axios.post("http://localhost:5000/new-tournament", {
            owner: auth.userId,
            name: tournament_name,
            teams: [tid1, tid2, tid3, tid4, tid5],
            players: {scorers: players[0], tscorers: players[1], assists: players[2], defenders: players[3]}})
            .then(response => {
                calcTournamentScore(response.data);
        });
    };

    const calcTournamentScore = (tid) => {
        axios.post("http://localhost:5000/calc-score", {
            tid: tid,
            uid: auth.userId})
            .then(response => {
                window.location.href = `http://localhost:3000/tournament/${tid}`;
            });
    }

    return (
        <div>
            <div className="players">Choose 2 players under each category: </div>
            {!playersMap ?  '' :
                <div className="players-container">
                    <PlayersInput playerMap = {playersMap}
                                  input = {"Scorers"}
                                  updatePlayers={updatePlayers}
                                  updateInputCount={updateInputCount}
                                  id={0}
                    />
                    <PlayersInput playerMap = {playersMap}
                                  input = {"3-Point Scorers"}
                                  updatePlayers={updatePlayers}
                                  updateInputCount={updateInputCount}
                                  id={1}/>
                    <PlayersInput playerMap = {playersMap}
                                  input = {"Assists"}
                                  updatePlayers={updatePlayers}
                                  updateInputCount={updateInputCount}
                                  id={2}/>
                    <PlayersInput playerMap = {playersMap}
                                  input = {"Defenders"}
                                  updatePlayers={updatePlayers}
                                  updateInputCount={updateInputCount}
                                  id={3}/>
                    {!isValid? <div className="valid-error">  Please choose 2 players under each category.</div> : null}
                    <div className="players-btn-con">
                        <Link to={"/newtournament/" +tournament_name}><div className="btn">Back</div></Link>
                        <div onClick={saveTournament} className="btn">Finish</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ChoosePlayers;