import React, {useEffect, useState, useContext} from 'react';
import './ChoosePlayers.css';
import PlayersInput from "../../components/add-game/PlayersInput";
import axios from "axios";
import {Link, useParams} from "react-router-dom";
import {AuthContext} from "../../utils/auth-context";

const ChoosePlayers = () => {
    const auth = useContext(AuthContext);
    const {gname, tid1, tid2, tid3, tid4, tid5} = useParams();

    useEffect(() => {
        axios.get("http://localhost:5000/get-players").then(response => {
            let players = response.data;
            players.sort((a,b) => (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
            players = players.filter((v,i,a)=>a.findIndex(t=>(t.name === v.name))===i)
            setPlayersMap(players);
        })
    }, []);

    const saveGame = () => {
        axios.post("http://localhost:5000/new-game", {
            owner: auth.userId,
            game_name: gname,
            teams: [tid1, tid2, tid3, tid4, tid5],
            players: {scorers: scorers, tscorers: tscorers, assists: assists, defenders: defenders}})
            .then(response => {
            window.location.href = `http://localhost:3000/game/${response.data._id}`;
        });
    };

    const [playersMap, setPlayersMap] = useState('');
    let scorers;
    let tscorers;
    let assists;
    let defenders;

    const updateScorers = (players) => {
        scorers = players;
    }

    const updateTscorers = (players) => {
        tscorers=players;
    }

    const updateAssists = (players) => {
        assists=players;
    }

    const updateDefenders = (players) => {
        defenders = players;
    }

    return (
        <div>
            <div className="players">Choose Players: </div>
            {!playersMap ?  '' :
                <div className="players-container">
                    <PlayersInput playerMap = {playersMap}
                                  input = {"Scorers"}
                                  updateScorers={updateScorers}/>
                    <PlayersInput playerMap = {playersMap}
                                  input = {"3-Point Scorers"}
                                  updateTscorers={updateTscorers}/>
                    <PlayersInput playerMap = {playersMap}
                                  input = {"Assists"}
                                  updateAssists={updateAssists}/>
                    <PlayersInput playerMap = {playersMap}
                                  input = {"Defenders"}
                                  updateDefenders={updateDefenders}/>
                    <div className="team-picker-btn-container">
                        <Link to={"/newgame/" +gname}><div className="btn">Back</div></Link>
                        <div onClick={saveGame} className="btn">Finish</div>
                    </div>
                </div>
            }
        </div>
    )
}

export default ChoosePlayers;